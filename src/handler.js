const { nanoid } = require("nanoid");
const books = require("./books");

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
      })
  }
  if (readPage > pageCount) {
    return res
      .status(400)
      .send({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
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
      })
  }

  return res
    .status(500)
    .send({
      status: "fail",
      message: "server error",
    })
};

module.exports = {
  addBookHandler
}