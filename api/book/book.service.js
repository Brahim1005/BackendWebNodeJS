const db = require("../../config/db");

module.exports = {
    addBook: (bookData, callback) => {
        db.query(
            `INSERT INTO Books(title, content, author, date_created) 
             VALUES (?, ?, ?, ?)`, 
            [
                bookData.title,
                bookData.content,
                bookData.author,
                bookData.date,
            ],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    fetchAllBooks: (callback) => {
        db.query(
            "SELECT id, title, content, author, date_created FROM Books",
            [],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    fetchBookById: (bookId, callback) => {
        db.query(
            `SELECT id, title, content, author, date_created FROM Books WHERE id = ?`,
            [bookId],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result[0]);
            }
        );
    },

    modifyBook: (bookId, updatedData, callback) => {
        db.query(
            `UPDATE Books SET title = ?, content = ?, author = ?, date_created = ? WHERE id = ?`,
            [
                updatedData.title,
                updatedData.content,
                updatedData.author,
                updatedData.date,
                bookId
            ],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    removeBook: (bookId, callback) => {
        db.query(
            "DELETE FROM Books WHERE id = ?",
            [bookId],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    }
}
