function FinishScreen({ dispatch, points, maxPossiblePoints, highscore }) {
	const percentage = (points / maxPossiblePoints) * 100;
	let emoji;

	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage <= 99) emoji = "🥈";
	if (percentage < 80) emoji = "🥉";
	return (
		<div className="start">
			<p className="result">
				{emoji} You score <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(High Score is {highscore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restart" })}
			>
				Restart
			</button>
		</div>
	);
}

export default FinishScreen;
