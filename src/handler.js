const { nanoid } = require("nanoid");
const books = require("./books");
const mappingObjectBook = require("./utils");

const addBookHandler = (req, res) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = req.body;

	const id = nanoid(16);
	const finished = Boolean(pageCount === readPage);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	if (!name) {
		return res
			.status(400)
			.send({
				status: "fail",
				message: "Gagal menambahkan buku. Mohon isi nama buku",
			});
	}
	if (readPage > pageCount) {
		return res
			.status(400)
			.send({
				status: "fail",
				message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
			});
	}

	books.push(newBook);
	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) {
		return res
			.status(201)
			.send({
				status: "success",
				message: "Buku berhasil ditambahkan",
				data: {
					bookId: id,
				},
			});
	}

	return res
		.status(500)
		.send({
			status: "fail",
			message: "server error",
		});
};

const getAllBooksHandler = (req, res) => {
	const allBooks = mappingObjectBook(books);

	const { name, reading, finished } = req.query;
	if (name) {
		const searchNameValue = name.toLowerCase();
		const results = allBooks.filter((book) => (
			book.name.toLowerCase().includes(searchNameValue)
		));
		return res
			.status(200)
			.send({
				status: "success",
				data: {
					books: results,
				},
			});
	}

	if (reading) {
		const searchReadingValue = Boolean(parseInt(reading, 10));
		const filterbook = books.filter((book) => (
			book.reading === searchReadingValue
		));

		const results = mappingObjectBook(filterbook);

		return res
			.status(200)
			.send({
				status: "success",
				data: {
					books: results,
				},
			});
	}

	if (finished) {
		const searchFinishedValue = Boolean(parseInt(finished, 10));
		const filterbook = books.filter((book) => (
			book.finished === searchFinishedValue
		));

		const results = mappingObjectBook(filterbook);

		return res
			.status(200)
			.send({
				status: "success",
				data: {
					books: results,
				},
			});
	}

	return res
		.status(200)
		.send({
			status: "success",
			data: {
				books: allBooks,
			},
		});
};

const getBookByIdHandler = (req, res) => {
	const { bookId } = req.params;

	const foundBook = books.find((book) => book.id === bookId);

	if (foundBook) {
		return res
			.status(200)
			.send({
				status: "success",
				data: {
					book: foundBook,
				},
			});
	}

	return res
		.status(404)
		.send({
			status: "fail",
			message: "Buku tidak ditemukan",
		});
};

const editBookByIdHandler = (req, res) => {
	const { bookId } = req.params;

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = req.body;

	if (!name) {
		return res
			.status(400)
			.send({
				status: "fail",
				message: "Gagal memperbarui buku. Mohon isi nama buku",
			});
	}
	if (readPage > pageCount) {
		return res
			.status(400)
			.send({
				status: "fail",
				message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
			});
	}

	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === bookId);

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};

		return res
			.status(200)
			.send({
				status: "success",
				message: "Buku berhasil diperbarui",
			});
	}

	return res
		.status(404)
		.send({
			status: "fail",
			message: "Gagal memperbarui buku. Id tidak ditemukan",
		});
};

const deleteBookByIdHandler = (req, res) => {
	const { bookId } = req.params;
	const index = books.findIndex((book) => book.id === bookId);

	if (index !== -1) {
		books.splice(index, 1);
		return res
			.status(200)
			.send({
				status: "success",
				message: "Buku berhasil dihapus",
			});
	}

	return res
		.status(404)
		.send({
			status: "fail",
			message: "Buku gagal dihapus. Id tidak ditemukan",
		});
};

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler,
};