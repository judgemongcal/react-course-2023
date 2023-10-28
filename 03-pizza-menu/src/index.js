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
	const pizzas = pizzaData;
	const pizzasLength = pizzas.length;

	return (
		<div className="menu">
			<h2>Our Menu</h2>

			{/* CONDITIONAL RENDERING WITH && */}
			{/* {pizzasLength > 0 && (
				<ul className="pizzas">
					{pizzas.map((pizza) => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			)} */}

			{/* CONDITIONAL RENDERING WITH TERNARY */}
			{pizzasLength > 0 ? (
				<ul className="pizzas">
					{pizzas.map((pizza) => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			) : (
				<p>We're still working on our menu. Please come back later!</p>
			)}

			{/* <Pizza
				name="Pizza Spinaci"
				ingredients="Tomato, mozarella, spinach, and ricotta cheese"
				photoName="pizzas/spinaci.jpg"
				price={10}
			/>
			<Pizza
				name="Pizza Salamino"
				ingredients="Tomato, mozarella, and pepperoni"
				photoName="pizzas/salamino.jpg"
				price={15}
			/> */}
		</div>
	);
};

function Pizza(props) {
	// console.log(props);
	return (
		<li className="pizza">
			<img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<p>{props.pizzaObj.price}</p>
			</div>
		</li>
	);
}

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
			{isOpen ? (
				<div className="order">
					<p>We are open until {closeHour}:00. Come visit us!</p>
					<button className="btn">Order Now</button>
				</div>
			) : (
				<p>
					We are currently closed. We're happy to serve you between {openHour} -{" "}
					{closeHour}
				</p>
			)}
		</footer>
	);
	// return React.createElement("footer", null, "We're currently open!");
};

// React v18
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
