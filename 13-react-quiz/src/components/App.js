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
	index: 0,
	answer: null,
	points: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, questions: action.payload, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		default:
			throw new Error("Action Unknown.");
	}
}

export default function App() {
	const [{ questions, status, index, answer }, dispatch] = useReducer(
		reducer,
		initialState,
	);

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
					<StartScreen numOfQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<Question
						question={questions[index]}
						dispatch={dispatch}
						answer={answer}
					/>
				)}
			</Main>
		</div>
	);
}
