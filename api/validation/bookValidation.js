function validateBookInput(book) {
    let validationErrors = [];

    console.log("Book Title: ", book.title);
    console.log("Book Content: ", book.content);
    console.log("Book Author: ", book.author);
    console.log("Publication Date: ", book.date);

    if (!book.title || !book.content || !book.author || !book.date) {
        validationErrors.push('All fields are required.');
    }

    if (typeof book.title !== 'string') {
        validationErrors.push("The title must be a string.");
    }

    if (typeof book.content !== 'string') {
        validationErrors.push("The content must be a string.");
    }

    if (typeof book.author !== 'string') {
        validationErrors.push("The author must be a string.");
    }

    if (typeof book.date !== 'string') {
        validationErrors.push("The date must be a string.");
    }

    if (validationErrors.length > 0) {
        return validationErrors;
    }

    return null;
}

module.exports = validateBookInput;
