import "./index.css";
import { useState } from "react";

export default function App() {
	return (
		<div className="container">
			<TipCal />
		</div>
	);
}

const TipCal = () => {
	const [bill, setBill] = useState(0);
	const [tip1, setTip1] = useState(0);
	const [tip2, setTip2] = useState(0);

	const tip = bill * ((tip1 + tip2) / 100);
	const total = tip + bill;

	function onHandleReset() {
		setBill(0);
		setTip1(0);
		setTip2(0);
	}

	return (
		<>
			<Bill bill={bill} onSetBill={setBill} />
			<Tip tip={tip1} onSetTip={setTip1}>
				you
			</Tip>
			<Tip tip={tip2} onSetTip={setTip2}>
				your friend
			</Tip>
			{total > 0 && (
				<Output total={total} tip={tip} handleReset={onHandleReset} />
			)}
		</>
	);
};

const Bill = ({ bill, onSetBill }) => {
	return (
		<div className="comp">
			<span>How much was the bill?</span>
			<input
				type="text"
				placeholder="Enter price of bill.."
				value={bill}
				onChange={(e) => onSetBill(Number(e.target.value))}
			/>
		</div>
	);
};

const Tip = ({ tip, onSetTip, children }) => {
	return (
		<div className="comp">
			<span>How did {children} like the service?</span>
			<select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
				<option value="0">Dissatisfied (0%)</option>
				<option value="5">It was okay (5%)</option>
				<option value="10">It was good (10%)</option>
				<option value="20">Absolutely amazing! (20%)</option>
			</select>
		</div>
	);
};

const Output = ({ total, tip, handleReset }) => {
	return (
		<>
			<h2>
				You pay ${total} (${total - tip} + ${tip} tip)
			</h2>
			<button onClick={handleReset}>Reset</button>
		</>
	);
};
