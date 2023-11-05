import "./index.css";
import { useState } from "react";

export default function App() {
	return (
		<div className="container">
			<Bill />
		</div>
	);
}

const Bill = () => {
	const [bill, setBill] = useState(0);
	return (
		<div className="comp">
			<span>How much was the bill?</span>
			<input
				type="text"
				placeholder="Enter price of bill.."
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>
		</div>
	);
};
