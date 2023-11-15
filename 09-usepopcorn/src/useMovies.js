import { useState, useEffect, useRef } from "react";

const ombdAPI = "1c4e1f1b";

export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError("");
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${ombdAPI}&s=${query}`,
						{ signal: controller.signal },
					);

					if (!res.ok) {
						throw new Error("Something went wrong with fetching your movies!");
					}

					const data = await res.json();

					if (data.Response === "False") {
						throw new Error("No results found!");
					}

					setMovies(data.Search);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						setError("Error");
					}
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			callback?.();
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query],
	);

	return { movies, isLoading, error };
}
