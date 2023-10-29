export default function App() {
	return (
		<div className="steps">
			<div className="numbers">
				<div>1</div>
				<div>2</div>
				<div>3</div>
			</div>
			<p className="message">Hello</p>
			<div className="buttons">
				<button style={{ backgroundColor: "#7950F2", color: "#FFFFFF" }}>
					Previous
				</button>
				<button style={{ backgroundColor: "#7950F2", color: "#FFFFFF" }}>
					Next
				</button>
			</div>
		</div>
	);
}
