import "./index.css";
import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const ombdAPI = "1c4e1f1b";

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedID, setSelectedID] = useState(null);
	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
	// const [watched, setWatched] = useState([]);

	const [watched, setWatched] = useLocalStorageState([], "watched");

	function handleSelectMovie(id) {
		setSelectedID((selected) => (selected === id ? null : id));
	}

	function handleCloseMovie() {
		setSelectedID(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
		// localStorage.setItem("watched", JSON.stringify([...watched, movie]));
	}

	function handleDeleteMovie(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

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
							<WatchedMovieList
								watched={watched}
								onDelete={handleDeleteMovie}
							/>
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
	const inputEl = useRef(null);

	useKey("Enter", function () {
		if (document.activeElement === inputEl.current) return;
		setQuery("");
		inputEl.current.focus();
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
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

	const countRef = useRef(0);

	useEffect(
		function () {
			if (userRating) countRef.current++;
		},
		[userRating],
	);

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
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedID,
	)?.userRating;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedID,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
			countRatingDecisions: countRef.current,
		};

		onAddWatched(newWatchedMovie);

		onClose();
	}

	useKey("Escape", onClose);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = "usePopcorn";
			};
		},
		[title],
	);

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
							{!isWatched ? (
								<>
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
								</>
							) : (
								<p>
									You already rated {title} with a score of {watchedUserRating}.
								</p>
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
					<span>{avgImdbRating.toFixed(1)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(1)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(1)} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovieList({ watched, onDelete }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDelete }) {
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

				<button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
					X
				</button>
			</div>
		</li>
	);
}
