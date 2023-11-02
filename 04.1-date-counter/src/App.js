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
	const [days, daysCnt] = useState(0);
	const date = new Date();
	date.setDate(date.getDate() + days);

	function handleReset() {
		daysCnt(0);
		stepCnt(1);
	}

	return (
		<div className="flex">
			<div className="btns">
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={(e) => stepCnt(Number(e.target.value))}
				/>
				{/* <button onClick={() => stepCnt((step) => step - 1)}>-</button> */}
				<span>Step: {step}</span>
				{/* <button onClick={() => stepCnt((step) => step + 1)}>+</button> */}
			</div>
			<div className="btns">
				<button onClick={() => daysCnt((days) => days - step)}>-</button>
				{/* <span>Count: {days}</span> */}
				<input
					type="text"
					value={days}
					onChange={(e) => daysCnt(Number(e.target.value))}
				/>
				<button onClick={() => daysCnt((days) => days + step)}>+</button>
			</div>
			<div className="main-text">
				{days === 0
					? "Today is "
					: days < 0
					? `${Math.abs(days)} days ago is `
					: `${Math.abs(days)} day from today is `}{" "}
				Wed {date.toDateString()}.
			</div>
			{step !== 1 || days !== 0 ? (
				<button className="btns" onClick={handleReset}>
					Reset
				</button>
			) : null}
		</div>
	);
}
