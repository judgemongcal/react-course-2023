import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
	{
		skill: "HTML+CSS",
		level: "Intermediate",
		color: "#2662EA",
	},
	{
		skill: "JavaScript",
		level: "Intermediate",
		color: "#EFD81D",
	},
	{
		skill: "Web Design",
		level: "Intermediate",
		color: "#C3DCAF",
	},
	{
		skill: "Git and GitHub",
		level: "Intermediate",
		color: "#E84F33",
	},
	{
		skill: "React",
		level: "Beginner",
		color: "#60DAFB",
	},
	{
		skill: "PostgreSQL",
		level: "Beginner",
		color: "#FF3B00",
	},
];

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
			{skills.map((skill) => (
				<Skills skillsProps={skill} key={skill.skill} />
			))}
		</div>
	);
};

const Skills = ({ skillsProps }) => {
	console.log(skillsProps.skill);
	// const style = { backgroundColor: props.bgColor };
	return (
		<p className="skills" style={{ backgroundColor: skillsProps.color }}>
			<strong>
				{skillsProps.skill}
				{/* {skillsProps.level === "Beginner"
					? ` 👶🏻`
					: skillsProps.level === "Intermediate"
					? ` ✌🏼`
					: ` 💪🏽`} */}

				{skillsProps.level === "Beginner" && " 👶🏻"}
				{skillsProps.level === "Intermediate" && " ✌🏼"}
				{skillsProps.level === "Advance" && "💪🏽"}
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
