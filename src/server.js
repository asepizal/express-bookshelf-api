const express = require("express");

const app = express();
const PORT = 9000;
const HOST = "localhost";

const booksRouter = require("./routes");

app.use(express.json());

app.use("/books", booksRouter);

app.listen(PORT, HOST, () => {
	// console.log(`Server running on http://${HOST}:${PORT}`);
});