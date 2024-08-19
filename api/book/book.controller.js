const { json } = require("express");
const { addBook, fetchAllBooks, fetchBookById, modifyBook, removeBook } = require("./book.service");
const validateBook = require('../validation/bookValidation');

module.exports = {

    // Add a new book
    // POST: http://localhost:3000/api/books
    /*
        Example body in POST request:
        {
            "title": "",
            "content": "Content Example",
            "author": "Author Example"
        }
    */
    addBook: (req, res) => {

        req.body.date = new Date().toLocaleDateString();
        const validationErrors = validateBook(req.body);
        const requestData = req.body;

        if (validationErrors) {
            return res.status(400).json({ validationErrors });
        }

        addBook(requestData, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection issue"
                });
            }

            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },

    // Retrieve all books
    // GET: http://localhost:3000/api/books
    fetchAllBooks: (req, res) => {
        fetchAllBooks((error, results) => {
            if (error) {
                console.error(error);
                return;
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    // Get a specific book by its ID
    // GET: http://localhost:3000/api/books/:id
    fetchBookById: (req, res) => {
        const bookId = req.params.id;
        fetchBookById(bookId, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }

            return res.json({
                success: 1,
                data: result
            });
        });
    },

    // Update an existing book
    // PUT: http://localhost:3000/api/books/:id
    modifyBook: (req, res) => {
        const updatedData = req.body;
        const bookId = req.params.id;
        req.body.date = new Date().toLocaleDateString();

        const validationErrors = validateBook(updatedData);
        if (validationErrors) {
            return res.status(400).json({ validationErrors });
        }

        modifyBook(bookId, updatedData, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection issue"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Book successfully updated"
            });
        });
    },

    // Delete a book by its ID
    // DELETE: http://localhost:3000/api/books/:id
    removeBook: (req, res) => {
        const bookId = req.params.id;
        removeBook(bookId, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection issue"
                });
            }

            if (!result) {
                return res.json({
                    success: 0,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Book successfully deleted"
            });
        });
    }
}
