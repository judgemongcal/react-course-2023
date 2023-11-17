function Progress({
	index,
	numofQuestions,
	points,
	maxPossiblePoints,
	answer,
}) {
	return (
		<header className="progress">
			<progress max={numofQuestions} value={index + Number(answer !== null)} />
			<p>
				Question <strong>{index + 1}</strong> / {numofQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints}
			</p>
		</header>
	);
}

export default Progress;
