import "./index.css";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const ombdAPI = "f84fc31d";
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
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [query, setQuery] = useState("interstellar");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedID, setSelectedID] = useState(null);

	function handleSelectMovie(id) {
		setSelectedID((selected) => (selected === id ? null : id));
	}

	function handleCloseMovie() {
		setSelectedID(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	useEffect(
		function () {
			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError("");
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${ombdAPI}&s=${query}`,
					);

					if (!res.ok) {
						throw new Error("Something went wrong with fetching your movies!");
					}

					const data = await res.json();

					if (data.Response === "False") {
						throw new Error("No results found!");
					}

					setMovies(data.Search);
				} catch (err) {
					setError("Error");
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			fetchMovies();
		},
		[query],
	);

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<Main>
				{/* Using props to pass the children */}
				{/* <Box element={<SearchResultItem movies={movies} />} />
				<Box
					element={
						<>
							<Summary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					}
				/> */}

				{/* Using children */}
				<Box>
					{/* {isLoading ? (
						<Loader />
					) : Error ? (
						<Error e={error} />
					) : (
						<SearchResultItem movies={movies} />
					)} */}
					{isLoading && <Loader />}
					{error && <Error e={error} />}
					{!isLoading && !error && (
						<SearchResultItem movies={movies} onSelect={handleSelectMovie} />
					)}
				</Box>

				<Box>
					{selectedID ? (
						<MovieDetails
							selectedID={selectedID}
							onClose={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<Summary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function Error({ e }) {
	return (
		<p className="error">
			{e} <span>🛑</span>
		</p>
	);
}

function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
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

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Button({ isOpen, setIsOpen }) {
	return (
		<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
			{isOpen ? "–" : "+"}
		</button>
	);
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<Button isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && children}
		</div>
	);
}

function SearchResultItem({ movies, onSelect }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
					<img src={movie.Poster} alt={`${movie.Title} poster`} />
					<h3>{movie.Title}</h3>
					<div>
						<p>
							<span>🗓</span>
							<span>{movie.Year}</span>
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}

function MovieDetails({ selectedID, onClose, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
	function handleAdd() {
		if (!isWatched) {
			const newWatchedMovie = {
				imdbID: selectedID,
				title,
				year,
				poster,
				imdbRating: Number(imdbRating),
				runtime: Number(runtime.split(" ").at(0)),
				userRating,
			};

			onAddWatched(newWatchedMovie);
		}

		onClose();
	}

	useEffect(
		function () {
			async function getMovieDetails(selectedID) {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${ombdAPI}&i=${selectedID}`,
				);
				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}

			getMovieDetails(selectedID);
		},
		[selectedID],
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onClose}>
							&larr;
						</button>
						<img src={poster} alt={title} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}{" "}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span> {imdbRating} IMDb Rating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							<StarRating
								maxRating={10}
								size={24}
								onSetRating={setUserRating}
							/>
							{userRating > 0 && (
								<button className="btn-add" onClick={handleAdd}>
									+ Add to List
								</button>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
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
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
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
