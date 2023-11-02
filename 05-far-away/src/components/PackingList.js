import { useState } from "react";

export default function PackingList({
	items,
	onDeleteItems,
	onToggleItems,
	onClearList,
}) {
	const [sortBy, setSortBy] = useState("input");

	let sortedItems;

	if (sortBy === "input") {
		sortedItems = items;
	} else if (sortBy === "desc") {
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	} else {
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));
	}

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItems={onDeleteItems}
						onToggleItems={onToggleItems}
					/>
				))}
			</ul>

			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by Input Order</option>
					<option value="desc">Sort by Description</option>
					<option value="packed">Sort by Packed Status</option>
				</select>
				<button onClick={onClearList}>Clear List</button>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItems, onToggleItems }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItems(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItems(item.id)}>❌</button>
		</li>
	);
}
