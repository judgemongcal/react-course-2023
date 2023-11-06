import "./index.css";
import { useState } from "react";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	return (
		<>
			<NavBar movies={movies} />
			<Main movies={movies} />
		</>
	);
}

function NavBar({ movies }) {
	const [query, setQuery] = useState("");
	return (
		<nav className="nav-bar">
			<Logo />
			<Search query={query} setQuery={setQuery} />
			<NumResults movies={movies} />
		</nav>
	);
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

function NumResults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main({ movies }) {
	return (
		<main className="main">
			<SearchBox movies={movies} />
			<WatchedBox />
		</main>
	);
}

function Button({ isOpen, setIsOpen }) {
	return (
		<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
			{isOpen ? "–" : "+"}
		</button>
	);
}

function SearchBox({ movies }) {
	const [isOpen1, setIsOpen1] = useState(true);

	return (
		<div className="box">
			<Button isOpen={isOpen1} setIsOpen={setIsOpen1} />
			{isOpen1 && (
				<ul className="list">
					{movies?.map((list) => (
						<SearchResultItem list={list} key={list.imdbID} />
					))}
				</ul>
			)}
		</div>
	);
}

function SearchResultItem({ list }) {
	return (
		<li>
			<img src={list.Poster} alt={`${list.Title} poster`} />
			<h3>{list.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{list.Year}</span>
				</p>
			</div>
		</li>
	);
}

function WatchedBox({}) {
	const [isOpen2, setIsOpen2] = useState(true);
	const [watched, setWatched] = useState(tempWatchedData);

	return (
		<div className="box">
			<Button isOpen={isOpen2} setIsOpen={setIsOpen2} />
			{isOpen2 && (
				<>
					<Summary watched={watched} />

					<WatchedMovieList watched={watched} />
				</>
			)}
		</div>
	);
}

function Summary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovieList({ watched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}
