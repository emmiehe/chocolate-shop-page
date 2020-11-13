import React from "react";
// import {Paper} from "@material-ui/core";

class Product extends React.Component {
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
      <div>
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
        {name: "Product 1"},
        {name: "Product 2"},
        {name: "Product 3"},
        {name: "Product 4"},
        {name: "Product 5"},
        {name: "Product 6"},
        {name: "Product 7"},
        {name: "Product 8"},
        {name: "Product 9"},
        {name: "Product 10"},
        {name: "Product 11"},
        {name: "Product 12"},
      ],
    };
  }

  render() {
    return (
      <div className="main">
        <Cart addItem={this.addItem}/>
        <div>
          {this.state.products.map((product) => <Product name={product.name}/>)}
        </div>
      </div>
    )
  }
}

export default App;
