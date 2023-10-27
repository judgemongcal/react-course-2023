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

const Info = () => {
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

const Skillset = () => {
	return (
		<div className="flex-container">
			<Skills skill="HTML+CSS" bgColor="lightblue" emoji="💪🏽" />
			<Skills skill="JavaScript" bgColor="gold" emoji="💻" />
			<Skills skill="React" bgColor="royalblue" emoji="👨🏻‍💻" />
			<Skills skill="Git and GitHub" bgColor="orange" emoji="🧬" />
			<Skills skill="Web Design" bgColor="lightgreen" emoji="🎨" />
		</div>
	);
};

const Skills = (props) => {
	// const style = { backgroundColor: props.bgColor };
	return (
		<p className="skills" style={{ backgroundColor: props.bgColor }}>
			<strong>
				{props.skill} {props.emoji}
			</strong>
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
