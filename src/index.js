import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SortByItem, App } from './App';
import reportWebVitals from './reportWebVitals';
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

var dataProducts = [
  {name: "Product A", id: 1, img: white_1, price: 4.4, color: "White", size: "individual", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product B", id: 2, img: dark_1, price: 9.9, color: "Dark", size: "party", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product C", id: 3, img: milk_1, price: 2.2, color: "Milk", size: "party", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product D", id: 4, img: white_2, price: 1.1, color: "White", size: "party", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product E", id: 5, img: dark_2, price: 5.5, color: "Dark", size: "individual", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product F", id: 6, img: milk_2, price: 6.6, color: "Milk", size: "party", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product G", id: 7, img: white_3, price: 7.7, color: "White", size: "twin-pack", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product H", id: 8, img: dark_3, price: 8.8, color: "Dark", size: "twin-pack", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product I", id: 9, img: milk_3, price: 3.3, color: "Milk", size: "twin-pack", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product J", id: 10, img: dark_4, price: 10.1, color: "Dark", size: "individual", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product K", id: 11, img: milk_4, price: 11.1, color: "Milk", size: "individual", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
  {name: "Product L", id: 12, img: dark_5, price: 12.2, color: "Dark", size: "party", description: "Hello I am a piece of delicious chocolate please come and eat me!"},
];

var dataFilters = [
  {name: "color", options: ["", "White", "Dark", "Milk"], value: ""},
  {name: "size", options: ["", "individual", "party", "twin-pack"], value: ""},
];

var dataSortByItems = [
  new SortByItem("Select", (a, b) => a.id - b.id),
  new SortByItem("Price Low to High", (a, b) => a.price - b.price),
  new SortByItem("Price High to Low", (a, b) => b.price - a.price),
];

ReactDOM.render(
  <React.StrictMode>
    <App products={dataProducts} filters={dataFilters} sortByItems={dataSortByItems}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
