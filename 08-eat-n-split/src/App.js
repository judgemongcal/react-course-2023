import "./index.css";
import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

const Button = ({ children, onClick }) => {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
};

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showFriendForm, setShowFriendForm] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleshowFriendForm() {
		setShowFriendForm((show) => !show);
	}

	function handleAddFriend(newFriend) {
		setFriends((friends) => [...friends, newFriend]);
		setShowFriendForm(false);
	}

	function handleSelectFriend(friend) {
		// setSelectedFriend(friend);
		setSelectedFriend((selected) =>
			selected?.id === friend.id ? null : friend,
		);
		setShowFriendForm(false);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelect={handleSelectFriend}
					selectedFriend={selectedFriend}
				/>
				{showFriendForm && (
					<FormAddFriend
						onAddFriend={handleAddFriend}
						isFormHidden={showFriendForm}
					/>
				)}
				<Button onClick={handleshowFriendForm}>
					{!showFriendForm ? `Add Friend` : `Close`}
				</Button>
			</div>
			{selectedFriend && <FormSplitBill friend={selectedFriend} />}
		</div>
	);
}

const FriendsList = ({ friends, onSelect, selectedFriend }) => {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onSelect={onSelect}
					selectedFriend={selectedFriend}
				/>
			))}
		</ul>
	);
};

const Friend = ({ friend, onSelect, selectedFriend }) => {
	const isSelected = selectedFriend?.id === friend.id;
	return (
		<li className={isSelected ? "selected" : ""}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					{" "}
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}

			{friend.balance > 0 && (
				<p className="green">
					{" "}
					{friend.name} owes you ${Math.abs(friend.balance)}
				</p>
			)}

			{friend.balance === 0 && (
				<p className="">You and {friend.name} are even</p>
			)}
			<Button onClick={() => onSelect(friend)}>
				{isSelected ? `Close` : "Select"}
			</Button>
		</li>
	);
};

const FormAddFriend = ({ onAddFriend, onHideForm }) => {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		if (!name || !image) return;

		e.preventDefault();
		const id = crypto.randomUUID();
		const newFriend = {
			name,
			image: `${image}?=${id}`,
			balance: 0,
			id,
		};

		setName("");
		setImage("https://i.pravatar.cc/48");

		onAddFriend(newFriend);
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>👫🏻 Friend name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<label>🎇 Image URL</label>
			<input
				type="text"
				value={image}
				onChange={(e) => {
					setImage(e.target.value);
				}}
			/>

			<Button>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ friend }) => {
	const [bill, setBill] = useState(0);
	const [userExpense, setUserExpense] = useState(0);
	const [whoIsPaying, setWhoIsPaying] = useState("");
	const friendExpense = bill - userExpense;

	return (
		<form className="form-split-bill">
			<h2>Split a bill with {friend.name}</h2>

			<label>💵 Bill Value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>🤑 Your Expense</label>
			<input
				type="text"
				value={userExpense}
				onChange={(e) =>
					setUserExpense(
						Number(e.target.value) > bill
							? userExpense
							: Number(e.target.value),
					)
				}
			/>

			<label>😎 {friend.name}'s Expense</label>
			<input
				type="text"
				disabled
				value={friendExpense > 0 ? friendExpense : 0}
			/>

			<label>🤑 Who is paying the Bill</label>
			<select
				value={whoIsPaying}
				onChange={(e) => setWhoIsPaying(e.target.value)}
			>
				<option value="user">You</option>
				<option value="friend">{friend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
};
