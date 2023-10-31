import { useState } from "react";

export default function App() {
	return (
		<div className="App">
			<Counter />
		</div>
	);
}

function Counter() {
	const [step, stepCnt] = useState(1);
	const [days, daysCnt] = useState(1);
	const date = new Date();
	date.setDate(date.getDate() + days);
	return (
		<div className="flex">
			<div className="btns">
				<button onClick={() => stepCnt((step) => step - 1)}>-</button>
				<span>Step: {step}</span>
				<button onClick={() => stepCnt((step) => step + 1)}>+</button>
			</div>
			<div className="btns">
				<button onClick={() => daysCnt((days) => days - step)}>-</button>
				<span>Count: {days}</span>
				<button onClick={() => daysCnt((days) => days + step)}>+</button>
			</div>
			<div className="main-text">
				{days} days from today is Wed {date.toDateString()}.
			</div>
		</div>
	);
}
