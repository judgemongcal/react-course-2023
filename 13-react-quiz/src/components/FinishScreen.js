function FinishScreen({ points, maxPossiblePoints, highscore }) {
	const percentage = (points / maxPossiblePoints) * 100;
	let emoji;

	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage <= 99) emoji = "🥈";
	if (percentage < 80) emoji = "🥉";
	return (
		<>
			<p className="result">
				{emoji} You score <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(High Score is {highscore} points)</p>
		</>
	);
}

export default FinishScreen;
