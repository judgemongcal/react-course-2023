import { useState } from "react";

export default function Stats({ items }) {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start adding some items to your list! 🚀</em>
			</p>
		);
	const numOfItems = items.length;
	const numOfPacked = items.filter((item) => item.packed).length;
	const packedPercentage = Math.round((numOfPacked / numOfItems) * 100);
	return (
		<footer className="stats">
			<em>
				{packedPercentage !== 100
					? `💼 You have ${numOfItems} items on your list, and you already packed
				${numOfPacked} (${packedPercentage}%)`
					: `You got everything! Ready to go ✈️`}
			</em>
		</footer>
	);
}
