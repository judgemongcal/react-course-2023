import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
	return (
		<div className="main-container">
			<Info />
			<Skillset />
		</div>
	);
}

const Info = (props) => {
	return (
		<div>
			<h1 className="name">Judge Mongcal</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor,
				lacus a tempus accumsan, quam lorem ullamcorper mauris, sed rhoncus est
				odio condimentum odio. Nulla a arcu at dui posuere tempus nec quis
				velit. Nulla pretium quis ante in euismod. Donec sollicitudin porta
				finibus. Ut mollis lacus nunc, et luctus leo posuere id. Donec euismod
				pulvinar lobortis. Donec iaculis nibh ut neque mollis imperdiet.{" "}
			</p>
		</div>
	);
};

const Skillset = (props) => {
	return (
		<div className="flex-container">
			<Skills skill="HTML+CSS" bgColor="lightblue" />
			<Skills skill="JavaScript" bgColor="gold" />
			<Skills skill="React" bgColor="royalblue" />
			<Skills skill="Git and GitHub" bgColor="orange" />
			<Skills skill="Web Design" bgColor="lightgreen" />
		</div>
	);
};

const Skills = (props) => {
	const style = { backgroundColor: props.bgColor };
	return (
		<p style={style} className="skills">
			<strong>{props.skill}</strong>
		</p>
	);
};

// React v18
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
