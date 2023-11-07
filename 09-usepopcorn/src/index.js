import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
// import "./index.css";
// import App from "./App";

function Test() {
	const [movieRating, setMovieRating] = useState(0);

	return (
		<div>
			<StarRating color="green" maxRating={10} onSetRating={setMovieRating} />
			<p>This movie was rated {movieRating} stars</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<StarRating
			maxRating={5}
			messages={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
		/>
		<StarRating maxRating={10} defaultRating={3} />
		<StarRating maxRating={5} size={68} color={"#685df1"} className="test" />
		<Test />
	</React.StrictMode>,
);
