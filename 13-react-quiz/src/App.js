// import DateCounter from "./DateCounter";

import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

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
		case "start":
			return { ...state, status: "active" };
		default:
			throw new Error("Action Unknown.");
	}
}

export default function App() {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

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
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numOfQuestions={numQuestions}
						dispatch={dispatch}
						status={status}
					/>
				)}
				{status === "active" && <Question />}
			</Main>
		</div>
	);
}
