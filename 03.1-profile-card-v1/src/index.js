import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
	return (
		<div>
			<Skillset />
		</div>
	);
}

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
