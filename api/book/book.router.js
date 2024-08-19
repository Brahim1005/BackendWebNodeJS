const router = require("express").Router();
const { addBook, fetchAllBooks, fetchBookById, modifyBook, removeBook } = require("./book.controller");

router.post("/", addBook);
router.get("/", fetchAllBooks);
router.get("/:id", fetchBookById);
router.put("/:id", modifyBook);
router.delete("/:id", removeBook);

module.exports = router;
