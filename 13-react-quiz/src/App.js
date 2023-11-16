// import DateCounter from "./DateCounter";

import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
	questions: [],
	status: "loading", //loading, error, ready, active, finished
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, questions: action.payload, status: "error" };
		default:
			throw new Error("Action Unknown.");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);
	return (
		<div className="app">
			<Header />

			<Main>
				<p>1/5</p>
				<p>Question</p>
			</Main>
		</div>
	);
}
