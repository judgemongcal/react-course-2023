import { useState } from "react";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((i) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		);
	}

	function handleClearList() {
		let confirmClear = window.confirm(
			"You are about to delete the entire list. Are you sure?",
		);
		if (confirmClear) {
			setItems([]);
		} else return;
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItems={handleDeleteItem}
				onToggleItems={handleToggleItem}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1> 🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [items, setItems] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();

		if (!description) return;

		const newItem = { id: Date.now(), description, quantity, packed: false };
		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItems, onToggleItems, onClearList }) {
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

function Stats({ items }) {
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
