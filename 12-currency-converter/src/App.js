import "./index.css";
import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
	const [value, setValue] = useState(0);
	const [startCur, setStartCur] = useState("USD");
	const [resultCur, setResultCur] = useState("");
	const [convertedVal, setConvertedVal] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	useEffect(
		function () {
			async function fetchConversion() {
				setIsLoading(true);
				if (value && startCur && resultCur) {
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${value}&from=${startCur}&to=${resultCur}`,
					);
					const data = await res.json();
					setIsLoading(false);
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
				{value < 1
					? "0"
					: isLoading
					? "Fetching from the API..."
					: convertedVal}{" "}
				{isLoading ? "" : resultCur}
			</p>
		</div>
	);
}
