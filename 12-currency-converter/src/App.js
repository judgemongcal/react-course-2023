import "./index.css";
import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
	const [value, setValue] = useState(0);
	const [startCur, setStartCur] = useState("USD");
	const [resultCur, setResultCur] = useState("");
	const [convertedVal, setConvertedVal] = useState("");
	useEffect(
		function () {
			async function fetchConversion() {
				if (value && startCur && resultCur) {
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${value}&from=${startCur}&to=${resultCur}`,
					);
					const data = await res.json();
					setConvertedVal(data.rates[resultCur]);
				}
			}
			fetchConversion();

			// return function () {
			// 	setValue(1);
			// 	setStartCur("USD");
			// 	setResultCur("");
			// };
		},
		[value, startCur, resultCur],
	);

	return (
		<div>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
			/>
			<select
				value={startCur}
				onChange={(inCurr) => setStartCur(inCurr.target.value)}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={resultCur}
				onChange={(resCurr) => setResultCur(resCurr.target.value)}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<p>
				{value < 1 ? "0" : convertedVal} {resultCur}
			</p>
		</div>
	);
}
