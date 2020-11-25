import React from "react";
import './App.css';
import {Card, Button} from "@material-ui/core";
// import {MDCRipple} from "@material-ui/ripple";

class Product extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Card className="mdc-card mdc-card--outlined">
        <div className="mdc-card__primary-action">
          <div className="mdc-card__media mdc-card__media--square">
          </div>
        </div>
        <h4>{this.props.name}</h4>
        <p>Hello I am a piece of delicious chocolate please come and eat me  </p>
        <div className="mdc-card__actions">
          <div className="button-container mdc-card__action-buttons">
            <Button className="mdc-button mdc-button--raised mdc-card__action mdc-card__action--button">
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
  }

  render(){
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}

class Cart extends React.Component {
  static initState(){
    return {
      lines: [
        {name: "line 1"},
        {name: "line 2"},
        {name: "line 3"},
        {name: "line 4"},
        {name: "line 5"},
        {name: "line 6"},
        {name: "line 7"},
        {name: "line 8"},
        {name: "line 9"},
        {name: "line 10"},
        {name: "line 11"},
        {name: "line 12"},
      ],
    };
  }

  constructor(props){
    super(props);
    this.state = Cart.initState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(Cart.initState());
  }

  render(){
    return (
      <div className="cart">
        <h4>Hi I'm a cart and this is what I have:</h4>
        {this.state.lines.map((line) => <CartLine name={line.name}/>)}
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [
        {name: "Product A"},
        {name: "Product B"},
        {name: "Product C"},
        {name: "Product D"},
        {name: "Product E"},
        {name: "Product F"},
        {name: "Product G"},
        {name: "Product H"},
        {name: "Product I"},
        {name: "Product J"},
        {name: "Product K"},
        {name: "Product L"},
      ],
    };
  }

  render() {
    return (
      <div className="main">
        <div className="products">
          {this.state.products.map((product) => <Product name={product.name}/>)}
        </div>
        <Cart addItem={this.addItem}/>
      </div>
    )
  }
}

export default App;
