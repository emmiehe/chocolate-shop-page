import React from "react";
import './App.css';
import {Card, Button} from "@material-ui/core";
import white_1 from "./white-1.jpg";
import white_2 from "./white-2.jpg";
import white_3 from "./white-3.jpg";
import dark_1 from "./dark-1.jpg";
import dark_2 from "./dark-2.jpg";
import dark_3 from "./dark-3.jpg";
import dark_4 from "./dark-4.jpg";
import dark_5 from "./dark-5.jpg";
import milk_1 from "./milk-1.jpg";
import milk_2 from "./milk-2.jpg";
import milk_3 from "./milk-3.jpg";
import milk_4 from "./milk-4.jpg";

var all_products = [
  {name: "Product A", id: 1, img: white_1, price: 4.4, color: "White", size: "individual"},
  {name: "Product B", id: 2, img: dark_1, price: 9.9, color: "Dark", size: "party"},
  {name: "Product C", id: 3, img: milk_1, price: 2.2, color: "Milk", size: "party"},
  {name: "Product D", id: 4, img: white_2, price: 1.1, color: "White", size: "party"},
  {name: "Product E", id: 5, img: dark_2, price: 5.5, color: "Dark", size: "individual"},
  {name: "Product F", id: 6, img: milk_2, price: 6.6, color: "Milk", size: "party"},
  {name: "Product G", id: 7, img: white_3, price: 7.7, color: "White", size: "twin-pack"},
  {name: "Product H", id: 8, img: dark_3, price: 8.8, color: "Dark", size: "twin-pack"},
  {name: "Product I", id: 9, img: milk_3, price: 3.3, color: "Milk", size: "twin-pack"},
  {name: "Product J", id: 10, img: dark_4, price: 10.1, color: "Dark", size: "individual"},
  {name: "Product K", id: 11, img: milk_4, price: 11.1, color: "Milk", size: "individual"},
  {name: "Product L", id: 12, img: dark_5, price: 12.2, color: "Dark", size: "party"},
];

var all_filters = [
  {name: "color", options: ["", "White", "Dark", "Milk"], value: ""},
  {name: "size", options: ["", "individual", "party", "twin-pack"], value: ""},
];

class Product extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.addToCart(event, this.props);
  }

  render(){
    return (
      <Card className="mdc-card mdc-card--outlined">
        <div className="mdc-card__primary-action">
          <div className="mdc-card__media mdc-card__media--square">
            <img src={this.props.img}/>
          </div>
        </div>
        <h4>Name: {this.props.name}</h4>
        <h4>Price: {this.props.price}</h4>
        <p>Color: {this.props.color}</p>
        <p>Size: {this.props.size}</p>
        <p>Hello I am a piece of delicious chocolate please come and eat me  </p>
        <div className="mdc-card__actions">
          <div className="button-container mdc-card__action-buttons">
            <Button onClick={this.handleClick} className="mdc-button mdc-button--raised mdc-card__action mdc-card__action--button">
              <span className="mdc-button__label">Add to Cart</span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

class Filter extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(option) {
    this.props.addToFilters(this.props.name, option);
  }

  render(){
    return (
      <h2 className="uppercase" style={{width: "100%"}}>{this.props.name}
        {this.props.options.map((option) => <Button onClick={() => this.handleClick(option)}>{option || "All"}</Button>)}
      </h2>
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
        <h5>{this.props.name}  <Button onClick={this.handleDecrease}>-</Button>{this.props.qty}<Button onClick={this.handleIncrease}>+</Button>  {this.props.price}/{this.props.total} <Button onClick={this.handleRemove}>Remove</Button></h5>
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: all_products,
      filters: all_filters,  // name, options, value
      cart_lines: [],
      total_amount: 0.0,
    };
    this.addToCart = this.addToCart.bind(this);
    this.remove = this.remove.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addToFilters = this.addToFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  addToCart(event, props) {
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
      this.state.cart_lines = this.state.cart_lines.filter(line => line.name !== props.name);
      this.setState({cart_lines: this.state.cart_lines, total_amount: parseFloat((this.state.total_amount - props.total).toFixed(2))});
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
    let products = all_products;
    for (let i=0; i< this.state.filters.length; i++){
      let filterName = this.state.filters[i].name;
      let filterValue = this.state.filters[i].value;
      if (filterValue) {
        console.log(filterValue);
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
    console.log(this.state.filters);
    this.applyFilters();
  }

  sortBy(event){
    let val = event.target.value;
    if (val === "select"){
      this.setState({products: this.state.products.sort((a, b) => a.id - b.id)});
    } else if (val === "lowToHigh"){
      this.setState({products: this.state.products.sort((a, b) => a.price - b.price)});
    } else if (val === "highToLow") {
      this.setState({products: this.state.products.sort((a, b) => b.price - a.price)});
    }
  }

  render() {
    return (
      <div className="main">
        <div className="products">
          {this.state.products.map((product) => <Product name={product.name} img={product.img} price={product.price} color={product.color} size={product.size} total={product.price} qty={1} addToCart={this.addToCart}/>)}
        </div>
        <div>
          <h4>Total Amount: {this.state.total_amount}</h4>
          <div className="cart">
            {this.state.cart_lines.map((line) => <CartLine name={line.name} price={line.price} total={line.total} qty={line.qty} remove={this.remove} increase={this.increase} decrease={this.decrease}/>)}
          </div>
        </div>
        <div>
          {this.state.filters.map((filter) => <Filter name={filter.name} options={filter.options} value={filter.value} addToFilters={this.addToFilters}/>)}
          <h2>Sort by: </h2>
          <select name="sortBy" id="sortBy" onChange={this.sortBy}>
            <option value="select">Select</option>
            <option value="lowToHigh">Price Low to High</option>
            <option value="highToLow">Price High to Low</option>
          </select>
        </div>
      </div>
    )
  }
}

export default App;
