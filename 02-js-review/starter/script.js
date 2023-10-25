const data = [
	{
		id: 1,
		title: "The Lord of the Rings",
		publicationDate: "1954-07-29",
		author: "J. R. R. Tolkien",
		genres: [
			"fantasy",
			"high-fantasy",
			"adventure",
			"fiction",
			"novels",
			"literature",
		],
		hasMovieAdaptation: true,
		pages: 1216,
		translations: {
			spanish: "El señor de los anillos",
			chinese: "魔戒",
			french: "Le Seigneur des anneaux",
		},
		reviews: {
			goodreads: {
				rating: 4.52,
				ratingsCount: 630994,
				reviewsCount: 13417,
			},
			librarything: {
				rating: 4.53,
				ratingsCount: 47166,
				reviewsCount: 452,
			},
		},
	},
	{
		id: 2,
		title: "The Cyberiad",
		publicationDate: "1965-01-01",
		author: "Stanislaw Lem",
		genres: [
			"science fiction",
			"humor",
			"speculative fiction",
			"short stories",
			"fantasy",
		],
		hasMovieAdaptation: false,
		pages: 295,
		translations: {},
		reviews: {
			goodreads: {
				rating: 4.16,
				ratingsCount: 11663,
				reviewsCount: 812,
			},
			librarything: {
				rating: 4.13,
				ratingsCount: 2434,
				reviewsCount: 0,
			},
		},
	},
	{
		id: 3,
		title: "Dune",
		publicationDate: "1965-01-01",
		author: "Frank Herbert",
		genres: ["science fiction", "novel", "adventure"],
		hasMovieAdaptation: true,
		pages: 658,
		translations: {
			spanish: "",
		},
		reviews: {
			goodreads: {
				rating: 4.25,
				ratingsCount: 1142893,
				reviewsCount: 49701,
			},
		},
	},
	{
		id: 4,
		title: "Harry Potter and the Philosopher's Stone",
		publicationDate: "1997-06-26",
		author: "J. K. Rowling",
		genres: ["fantasy", "adventure"],
		hasMovieAdaptation: true,
		pages: 223,
		translations: {
			spanish: "Harry Potter y la piedra filosofal",
			korean: "해리 포터와 마법사의 돌",
			bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
			portuguese: "Harry Potter e a Pedra Filosofal",
		},
		reviews: {
			goodreads: {
				rating: 4.47,
				ratingsCount: 8910059,
				reviewsCount: 140625,
			},
			librarything: {
				rating: 4.29,
				ratingsCount: 120941,
				reviewsCount: 1960,
			},
		},
	},
	{
		id: 5,
		title: "A Game of Thrones",
		publicationDate: "1996-08-01",
		author: "George R. R. Martin",
		genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
		hasMovieAdaptation: true,
		pages: 835,
		translations: {
			korean: "왕좌의 게임",
			polish: "Gra o tron",
			portuguese: "A Guerra dos Tronos",
			spanish: "Juego de tronos",
		},
		reviews: {
			goodreads: {
				rating: 4.44,
				ratingsCount: 2295233,
				reviewsCount: 59058,
			},
			librarything: {
				rating: 4.36,
				ratingsCount: 38358,
				reviewsCount: 1095,
			},
		},
	},
];

function getBooks() {
	return data;
}

function getBook(id) {
	return data.find((d) => d.id === id);
}

/*
// Destructuring
const books = getBook(1);

const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
	books;

title;
author;
pages;
publicationDate;
genres;
hasMovieAdaptation;

const primaryGenre = genres[0];
const secondaryGenre = genres[1];

primaryGenre;

const [primaryGenre2, secondaryGenre2, ...otherGenres] = genres; // Rest Operator

console.log(primaryGenre2, secondaryGenre2, otherGenres);

// Spread Operator

const newGenres = [...genres, "epic fantasy"];
console.log(newGenres);

const updatedBook = {
	...books,
	mvoiePublicationDate: "2001-12-19",
	pages: 1210,
};

console.log(updatedBook);

// Arrow Functions

function getYear(str) {
	return str.split("-")[0];
}

const getYear2 = (str) => str.split("-")[0];

console.log(getYear(publicationDate), getYear2(publicationDate));

// Short-circuiting
console.log(true && "Some thing");
console.log(false && "Some thing");
console.log(hasMovieAdaptation && "This book has a movie");

// Falsy and Truthy for &&
console.log("jonas" && "some string");
console.log(0 && "some string");

// Falsy and Truthy for ||
console.log(true || "Some string");
console.log(false || "Some string");

console.log(books.translations.spanish);
const spanishTranslation = books.translations.spanish || "NOT TRANSLATED";
console.log(spanishTranslation);

console.log(books.reviews.librarything.reviewsCount);
const countWrong = books.reviews.librarything.reviewsCount || "no data";

console.log(countWrong);

// NULLISH COALESCING
const count = books.reviews.librarything.reviewsCount ?? "no data"; //returns 2nd value if left value is null or undefined, but not if it is 0 or an empty string

// Optional Chaining

function getTotalReview(books) {
	const goodRead = books.reviews?.goodreads.reviewsCount;
	const libThing = books.reviews?.librarything?.reviewsCount ?? 0; // if JS can't find librarything, it will then assume that the value is null. It will assign the value of 0 instead (nullish coalescing)
	return goodRead + libThing;
}

console.log(getTotalReview(books));



function getTotalReview(books) {
	const goodRead = books.reviews?.goodreads.reviewsCount;
	const libThing = books.reviews?.librarything?.reviewsCount ?? 0; // if JS can't find librarything, it will then assume that the value is null. It will assign the value of 0 instead (nullish coalescing)
	return goodRead + libThing;
}

// Array MAP Method

const books = getBooks();

const x = [1, 2, 3, 4].map((el) => el * 2);
console.log(x);

const titles = books.map((book) => book.title);
console.log(titles);

const titleAndAuthor = books.map((book) => ({
	title: book.title,
	author: book.author,
	reviews: getTotalReview(book),
}));
console.log(titleAndAuthor);

// Array FILTER Method
const longBooksWithMovie = books
	.filter((book) => book.pages > 500)
	.filter((book) => book.hasMovieAdaptation);

console.log(longBooksWithMovie);

const adventureBooks = books
	.filter((book) => book.genres.includes("adventure"))
	.map((book) => book.title);
console.log(adventureBooks);

// Array REDUCE Method - reduce an array into one value
const numOfPages = books.reduce((sum, book) => sum + book.pages, 0); // sum is the accumulator variable
console.log(numOfPages);

// Array SORT Method - used to sort an array; NOT A FUNCTIONAL METHOD (mutates)
const jumbled = [3, 7, 8, 2, 1, 4, 9, 0];
const sorted = jumbled.slice().sort((a, b) => b - a); // use slice() to make a copy of the original array to preserve the orginal array from mutating when sort is used
console.log(sorted);
console.log(jumbled);

const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
console.log(sortedByPages);

// Working with Immutable Arrays

// 1. Add book object to array
const newBook = {
	id: 6,
	title: "Harry Potter and the Chamber of Secrets",
	author: "J. K. Rowling",
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// 2. Delete book object from an array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3); // only includes objects with ID that is not 3
console.log(booksAfterDelete);

// 3. Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
	book.id === 1 ? { ...book, pages: 12100 } : book,
);
console.log(booksAfterUpdate);
*/

// Async JS

fetch("https://jsonplaceholder.typicode.com/todos/1")
	.then((res) => res.json())
	.then((data) => console.log(data));

console.log("hello world");
