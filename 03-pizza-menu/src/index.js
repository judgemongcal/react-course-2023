import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

const Header = () => {
	// const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };

	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
};

const Menu = () => {
	return (
		<div className="menu">
			<h2>Our Menu</h2>
			<Pizza />
			<Pizza />
			<Pizza />
		</div>
	);
};

const Footer = () => {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);
	// if (hour >= openHour && hour <= closeHour) {
	// 	alert("We're currently open!");
	// } else {
	// 	alert("Sorry! We're currently closed!");
	// }
	return (
		<footer className="footer">
			{new Date().toLocaleTimeString()}. We're currently open
		</footer>
	);
	// return React.createElement("footer", null, "We're currently open!");
};

function Pizza() {
	return (
		<div className="pizza">
			<img src="pizzas/spinaci.jpg" alt="Pizza Spinaci" />
			<h3>Pizza Spinaci</h3>
			<p>Tomato, mozarella, spinach, and ricotta cheese</p>
		</div>
	);
}

// React v18
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
