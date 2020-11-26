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

// import {MDCRipple} from "@material-ui/ripple";

var all_products = [
  {name: "Product A", img: white_1, price: 1.1, color: "White"},
  {name: "Product B", img: dark_1, price: 2.2, color: "Dark"},
  {name: "Product C", img: milk_1, price: 3.3, color: "Milk"},
  {name: "Product D", img: white_2, price: 4.4, color: "White"},
  {name: "Product E", img: dark_2, price: 5.5, color: "Dark"},
  {name: "Product F", img: milk_2, price: 6.6, color: "Milk"},
  {name: "Product G", img: white_3, price: 7.7, color: "White"},
  {name: "Product H", img: dark_3, price: 8.8, color: "Dark"},
  {name: "Product I", img: milk_3, price: 9.9, color: "Milk"},
  {name: "Product J", img: dark_4, price: 10.1, color: "Dark"},
  {name: "Product K", img: milk_4, price: 11.1, color: "Milk"},
  {name: "Product L", img: dark_5, price: 12.2, color: "Dark"},
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
      cart_lines: [],
      total_amount: 0.0,
    };
    this.addToCart = this.addToCart.bind(this);
    this.remove = this.remove.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.selectColor = this.selectColor.bind(this);
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

  selectColor(color) {
    if (!color){
     this.setState({products: all_products});
    }else {
      this.setState({products: all_products.filter(product => product.color === color)});
    }
  }

  render() {
    return (
      <div className="main">
        <div className="products">
          {this.state.products.map((product) => <Product name={product.name} img={product.img} price={product.price} color={product.color} total={product.price} qty={1} addToCart={this.addToCart}/>)}
        </div>
        <div>
          <h4>Total Amount: {this.state.total_amount}</h4>
          <div className="cart">
            {this.state.cart_lines.map((line) => <CartLine name={line.name} price={line.price} total={line.total} qty={line.qty} remove={this.remove} increase={this.increase} decrease={this.decrease}/>)}
          </div>
        </div>
        <h2 style={{width: "100%"}}>Color: <Button onClick={() => this.selectColor("")}>All</Button> <Button onClick={() => this.selectColor("White")}>White</Button> <Button onClick={() => this.selectColor("Dark")}>Dark</Button> <Button onClick={() => this.selectColor("Milk")}>Milk</Button> </h2>
      </div>
    )
  }
}

export default App;
