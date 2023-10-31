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
	return (
		<div className="flex">
			<div>
				<button onClick={() => stepCnt((step) => step - 1)}>-</button>
				<span>Step: {step}</span>
				<button onClick={() => stepCnt((step) => step + 1)}>+</button>
			</div>

			<div>
				<button onClick={() => daysCnt((days) => days - 1)}>-</button>
				<span>Count: {days}</span>
				<button onClick={() => daysCnt((days) => days + 1)}>+</button>
			</div>
		</div>
	);
}
