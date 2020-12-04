import React from "react";
import './App.css';
import {Card, Button} from "@material-ui/core";
import {AddCircleOutline, RemoveCircleOutline, DeleteForeverOutlined} from "@material-ui/icons";

// SortByItem is a vanilla javascript object
// it has two attributes:
// name (name of the sort), fn (sort's compare fn)
export class SortByItem {
  constructor(name, fn) {
    this.name = name;
    this.fn = fn;
  }
};

// Individual product
// each product has id (key), img, name, price, description, and a list of filterable attributes (color and size)
class Product extends React.Component {
  render(){
    return (
      <Card className="mdc-card mdc-card--outlined">
        <div className="mdc-card__primary-action">
          <div className="mdc-card__media mdc-card__media--square">
            <img src={this.props.img} alt={this.props.description}/>
          </div>
        </div>
        <div className="card-content">
          <p>Name: {this.props.name}</p>
          <p>Price: {this.props.price}</p>
          <p>{this.props.description}</p>
          {/* for future generalization, maybe consider this: {this.props.filterable_fields.map(field => <p>{field}: {this.props.filterable_fields[field]}</p>)} */}
          <p>Color: {this.props.color}</p>
          <p>Size: {this.props.size}</p>
          <div className="mdc-card__actions">
            <div className="button-container mdc-card__action-buttons">
              <Button variant="contained" color="primary" onClick={() => this.props.onAddToCart(this.props)} className="mdc-button mdc-button--raised mdc-card__action mdc-card__action--button">
                <span className="mdc-button__label">Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

// FilterValue's text color changes according to props.color
class FilterValue extends React.Component {
  render(){
    return (
      <Button color={this.props.color} onClick={() => this.props.selectValue(this.props.name)}>{this.props.name || "All"}</Button>
    );
  }
}

// Filter's parent will tell Filter's child (FilterValue) whether the FilterValue is a selected value or not
class Filter extends React.Component {
  render(){
    return (
      <div>
        <div><span className="capitalize">{this.props.name}</span>{this.props.options.map((option) => <FilterValue color={option===this.props.value ? "default": "primary"} name={option} selectValue={(selectedValue) => this.props.addToFilters(this.props.name, selectedValue)}/>)}</div>
      </div>
    );
  }
}

// SortBy holds a list of SortByItems: [<SortByItem> item1, ...]
class SortBy extends React.Component {
  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // When a sortBy is selected, it will call parent's sortBy
  // along with a corresponding sort function fn
  // Note that SortByItem has name and fn attributes
  handleSelect(event) {
    let fn = this.props.sortByItems[parseInt(event.target.value)].fn;
    this.props.sortBy(fn);
  }

  render(){
    return (
      <div>
        <div><span className="capitalize">Sort by</span>
        <select onChange={this.handleSelect}>
          {this.props.sortByItems.map((item, index) => <option value={index}>{item.name}</option>)}
        </select>
        </div>
      </div>
    );
  }
}

class CartLine extends React.Component {
  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleRemove() {
    this.props.remove(this.props);
  }
  handleIncrease() {
    this.props.increase(this.props);
  }
  handleDecrease() {
    this.props.decrease(this.props);
  }

  render(){
    return (
        <p className="cart-line">
          <span>{this.props.name}</span>
          <RemoveCircleOutline variant="contained" onClick={this.handleDecrease}/>
          <span> {this.props.qty}</span>
          <AddCircleOutline onClick={this.handleIncrease}/>
          <span className="text-right">{this.props.price.toFixed(2)}</span>
          <span className="text-right">{this.props.total.toFixed(2)}</span>
          <DeleteForeverOutlined variant="contained" color="secondary" className="button-container" onClick={this.handleRemove}>Remove</DeleteForeverOutlined>
        </p>
    );
  }
}

class Cart extends React.Component {
  render() {
    return (
      <div className="cart">
        <h2>Cart: </h2>
        <h4>Total Amount: {this.props.totalAmount.toFixed(2)}</h4>
          {this.props.totalAmount ?
            <div>
              <div className="cart-line">
            <span>Product Name</span>
            <span/>
            <span>Qty</span>
            <span/>
            <span className="text-right">Unit Price</span>
            <span className="text-right">Total</span>
            <span/>
          </div>
            {this.props.cartLines.map((line) => <CartLine key={line.name} name={line.name} price={line.price}
                                             total={line.total} qty={line.qty} remove={this.props.remove}
                                             increase={this.props.increase}
                                             decrease={this.props.decrease}/>)}
              <Button style={{width: "100%"}} variant="contained" color="primary" onClick={this.props.checkOut}>Check
                Out</Button>
            </div>:
            <div>Your cart is empty.</div>
          }
      </div>
    )
  }
}

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: this.props.products,  // id, name, img, description, two attributes, price
      filters: this.props.filters,  // name, options, value
      cartLines: [],
      totalAmount: 0.0,
      sortByFn: this.props.sortByItems[0].fn, // this is the default sortByFn
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.remove = this.remove.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addToFilters = this.addToFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }

  handleAddToCart(props) {
    let existing_line = this.state.cartLines.find(line => line.name === props.name);
    if (!existing_line){
      this.state.cartLines.push({name: props.name, qty: props.qty, price: props.price, total: props.price});
    } else {
      existing_line.total = parseFloat((existing_line.total + props.price * props.qty).toFixed(2));
      existing_line.qty += props.qty;
    }

    this.setState({cartLines: this.state.cartLines, totalAmount: parseFloat((this.state.totalAmount + props.total).toFixed(2))});
  }

  remove(props){
    let existing_line = this.state.cartLines.find(line => line.name === props.name);
    if (existing_line) {
      let res_cartLines = this.state.cartLines.filter(line => line.name !== props.name);
      this.setState({cartLines: res_cartLines, totalAmount: parseFloat((this.state.totalAmount - props.total).toFixed(2))});
    }
  }

  increase(props){
    let existing_line = this.state.cartLines.find(line => line.name === props.name);
    if (existing_line) {
      existing_line.qty += 1;
      existing_line.total = parseFloat((existing_line.total + props.price).toFixed(2));
      this.setState({cartLines: this.state.cartLines, totalAmount: parseFloat((this.state.totalAmount + props.price).toFixed(2))});
    }
  }

  decrease(props){
    let existing_line = this.state.cartLines.find(line => line.name === props.name);
    if (existing_line) {
      existing_line.qty -= 1;
      if (!existing_line.qty){
        this.remove(props);
      }else {
        existing_line.total = parseFloat((existing_line.total - props.price).toFixed(2));
        this.setState({cartLines: this.state.cartLines, totalAmount: parseFloat((this.state.totalAmount - props.price).toFixed(2))});
      }
    }
  }

  sortBy(fn){
    this.setState({sortByFn: fn, products: this.state.products.sort(fn)});
  }

  applyFilters(){
    let products = this.props.products;
    for (let i=0; i<this.state.filters.length; i++){
      let filterName = this.state.filters[i].name;
      let filterValue = this.state.filters[i].value;
      if (filterValue) {
        products = products.filter(product => product[filterName] === filterValue);
      }
    }
    this.setState({products: products.sort(this.state.sortByFn)});
    // this.sortBy(this.state.sortByFn);
  }

  addToFilters(filterName, option) {
    let existing_filter = this.state.filters.find(filter => filter.name === filterName);
    if (existing_filter){
      existing_filter.value = option;
    }
    this.setState({filter: this.state.filters});
    this.applyFilters();
  }



  checkOut(){
    alert("Your cart total is " + this.state.totalAmount.toFixed(2));
  }

  render() {
    return (
      <div className="main">
        <div className="shop">
          <div className="nav">
            {this.state.filters.map((filter) => <Filter key={filter.name} name={filter.name} options={filter.options} value={filter.value} addToFilters={this.addToFilters}/>)}
            {<SortBy sortByItems={this.props.sortByItems} sortBy={this.sortBy}/>}
          </div>
          <div className="products">
            {this.state.products.map((product) => <Product key={product.id} name={product.name} img={product.img} description={product.description} price={product.price} color={product.color} size={product.size} total={product.price} qty={1} onAddToCart={this.handleAddToCart}/>)}
          </div>
        </div>
        <Cart cartLines={this.state.cartLines} totalAmount={this.state.totalAmount} remove={this.remove} increase={this.increase} decrease={this.decrease} checkOut={this.checkOut}/>
      </div>
    )
  }
}

// export default App;
