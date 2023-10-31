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
				<button>-</button>
				<span>Step: {step}</span>
				<button>+</button>
			</div>

			<div>
				<button>-</button>
				<span>Count: {days}</span>
				<button>+</button>
			</div>
		</div>
	);
}
