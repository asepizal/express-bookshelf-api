const express = require("express");
const {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler,
} = require("./handler");

const router = express.Router();

router.post("/", addBookHandler);
router.get("/", getAllBooksHandler);
router.get("/:bookId", getBookByIdHandler);
router.put("/:bookId", editBookByIdHandler);
router.delete("/:bookId", deleteBookByIdHandler);

module.exports = router;