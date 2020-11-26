import React from "react";
import './App.css';
import {Card, Button} from "@material-ui/core";
// import {MDCRipple} from "@material-ui/ripple";

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
          </div>
        </div>
        <h4>{this.props.name}</h4>
        <h4>{this.props.price}</h4>
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
      products: [
        {name: "Product A", price: 1.1},
        {name: "Product B", price: 2.2},
        {name: "Product C", price: 3.3},
        {name: "Product D", price: 4.4},
        {name: "Product E", price: 5.5},
        {name: "Product F", price: 6.6},
        {name: "Product G", price: 7.7},
        {name: "Product H", price: 8.8},
        {name: "Product I", price: 9.9},
        {name: "Product J", price: 10.1},
        {name: "Product K", price: 11.1},
        {name: "Product L", price: 12.2},
      ],
      cart_lines: [],
      total_amount: 0.0,
    };
    this.addToCart = this.addToCart.bind(this);
    this.remove = this.remove.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
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

  render() {
    return (
      <div className="main">
        <div className="products">
          {this.state.products.map((product) => <Product name={product.name} price={product.price} total={product.price} qty={1} addToCart={this.addToCart}/>)}
        </div>
        <div>
          <h4>Total Amount: {this.state.total_amount}</h4>
          <div className="cart">
            {this.state.cart_lines.map((line) => <CartLine name={line.name} price={line.price} total={line.total} qty={line.qty} remove={this.remove} increase={this.increase} decrease={this.decrease}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
