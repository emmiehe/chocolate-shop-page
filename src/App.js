import React from "react";
import './App.css';
import {Card, Button} from "@material-ui/core";

// name, fn
export class SortByItem {
  constructor(name, fn) {
    this.name = name;
    this.fn = fn;
  }
};

// Individual product
// Including id, name, img, description, two attributes and a price
class Product extends React.Component {

  render(){
    return (
      <Card className="mdc-card mdc-card--outlined">
        <div className="mdc-card__primary-action">
          <div className="mdc-card__media mdc-card__media--square">
            <img src={this.props.img} alt={this.props.description}/>
          </div>
        </div>
        <h4>Name: {this.props.name}</h4>
        <h4>Price: {this.props.price}</h4>
        <p>Color: {this.props.color}</p>
        <p>Size: {this.props.size}</p>
        <p>{this.props.description}</p>
        <div className="mdc-card__actions">
          <div className="button-container mdc-card__action-buttons">
            <Button onClick={(event) => this.props.onAddToCart(event, this.props)} className="mdc-button mdc-button--raised mdc-card__action mdc-card__action--button">
              <span className="mdc-button__label">Add to Cart</span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

// name
class FilterValue extends React.Component {
  render(){
    return (
      <Button color={this.props.color} onClick={() => this.props.selectValue(this.props.name)}>{this.props.name || "All"}</Button>
    );
  }
}

class Filter extends React.Component {

  render(){
    return (
      <h2 className="uppercase" style={{width: "100%"}}>
        {this.props.name}
        {this.props.options.map((option) => <FilterValue color={option===this.props.value ? "default": "primary"} name={option} selectValue={(selectedValue) => this.props.addToFilters(this.props.name, selectedValue)}/>)}
      </h2>
    );
  }
}

// [<SortByItem> item1, ...]
class SortBy extends React.Component {
  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    let fn = this.props.sortByItems[parseInt(event.target.value)].fn;
    this.props.sortBy(fn);
  }

  render(){
    return (
      <div>
        <span>Sort by: </span>
        <select onChange={this.handleSelect}>
          {this.props.sortByItems.map((item, index) => <option value={index}>{item.name}</option>)}
        </select>
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

  handleRemove(event) {
    this.props.remove(event, this.props);
  }

  handleIncrease(event) {
    this.props.increase(event, this.props);
  }
  handleDecrease(event) {
    this.props.decrease(event, this.props);
  }

  render(){
    return (
      <div>
        <h5>{this.props.name}  <Button onClick={this.handleDecrease}>-</Button>{this.props.qty}<Button onClick={this.handleIncrease}>+</Button> {this.props.price}/{this.props.total} <Button onClick={this.handleRemove}>Remove</Button></h5>
      </div>
    );
  }
}

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: this.props.products,  // id, name, img, description, two attributes, price
      filters: this.props.filters,  // name, options, value
      cart_lines: [],
      total_amount: 0.0,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.remove = this.remove.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addToFilters = this.addToFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  handleAddToCart(event, props) {
    let existing_line = this.state.cart_lines.find(line => line.name === props.name); // perhaps using key is better
    if (!existing_line){
      this.state.cart_lines.push({name: props.name, qty: props.qty, price: props.price, total: props.price});
    } else {
      existing_line.total = parseFloat((existing_line.total + props.price * props.qty).toFixed(2));
      existing_line.qty += props.qty;
    }

    this.setState({cart_lines: this.state.cart_lines, total_amount: parseFloat((this.state.total_amount + props.total).toFixed(2))});
  }

  remove(event, props){
    let existing_line = this.state.cart_lines.find(line => line.name === props.name); // perhaps using key is better
    if (existing_line) {
      let res_cart_lines = this.state.cart_lines.filter(line => line.name !== props.name);
      this.setState({cart_lines: res_cart_lines, total_amount: parseFloat((this.state.total_amount - props.total).toFixed(2))});
    }
  }

  increase(event, props){
    let existing_line = this.state.cart_lines.find(line => line.name === props.name); // perhaps using key is better
    if (existing_line) {
      existing_line.qty += 1;
      existing_line.total = parseFloat((existing_line.total + props.price).toFixed(2));
      this.setState({cart_lines: this.state.cart_lines, total_amount: parseFloat((this.state.total_amount + props.price).toFixed(2))});
    }
  }

  decrease(event, props){
    let existing_line = this.state.cart_lines.find(line => line.name === props.name); // perhaps using key is better
    if (existing_line) {
      existing_line.qty -= 1;
      if (!existing_line.qty){
        this.remove(event, props);
      }else {
        existing_line.total = parseFloat((existing_line.total - props.price).toFixed(2));
        this.setState({cart_lines: this.state.cart_lines, total_amount: parseFloat((this.state.total_amount - props.price).toFixed(2))});
      }
    }
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
    this.setState({products: products});
  }

  addToFilters(filterName, option) {
    let existing_filter = this.state.filters.find(filter => filter.name === filterName);
    if (existing_filter){
      existing_filter.value = option;
    }
    this.setState({filter: this.state.filters});
    this.applyFilters();
  }

  sortBy(fn){
    this.setState({products: this.state.products.sort(fn)});
  }

  render() {
    return (
      <div className="main">
        <div className="products">
          {this.state.products.map((product) => <Product key={product.id} name={product.name} img={product.img} description={product.description} price={product.price} color={product.color} size={product.size} total={product.price} qty={1} onAddToCart={this.handleAddToCart}/>)}
        </div>
        <div>
          <h4>Total Amount: {this.state.total_amount}</h4>
          <div className="cart">
            {this.state.cart_lines.map((line) => <CartLine key={line.name} name={line.name} price={line.price} total={line.total} qty={line.qty} remove={this.remove} increase={this.increase} decrease={this.decrease}/>)}
          </div>
        </div>
        <div>
          {this.state.filters.map((filter) => <Filter key={filter.name} name={filter.name} options={filter.options} value={filter.value} addToFilters={this.addToFilters}/>)}
          {<SortBy sortByItems={this.props.sortByItems} sortBy={this.sortBy}/>}
        </div>
      </div>
    )
  }
}

// export default App;
