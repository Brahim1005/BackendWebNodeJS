const database = require("../../config/db");

module.exports = {
    addUser: (userInfo, callback) => {
        database.query(
            `INSERT INTO User(first_name, last_name, gender, city, street, house_number, phone_number) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userInfo.first_name,
                userInfo.last_name,
                userInfo.gender,
                userInfo.city,
                userInfo.street,
                userInfo.house_number,
                userInfo.phone_number
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },

    fetchAllUsers: (callback) => {
        database.query(
            "SELECT id, first_name, last_name, gender, city, street, house_number, phone_number FROM User",
            [],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    fetchUserById: (userId, callback) => {
        database.query(
            `SELECT id, first_name, last_name, gender, city, street, house_number, phone_number FROM User WHERE id = ?`,
            [userId],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result[0]);
            }
        );
    },

    modifyUser: (userId, userInfo, callback) => {
        database.query(
            `UPDATE User SET first_name = ?, last_name = ?, gender = ?, city = ?, street = ?, house_number = ?, phone_number = ? WHERE id = ?`,
            [
                userInfo.first_name,
                userInfo.last_name,
                userInfo.gender,
                userInfo.city,
                userInfo.street,
                userInfo.house_number,
                userInfo.phone_number,
                userId
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },

    removeUser: (userId, callback) => {
        database.query(
            "DELETE FROM User WHERE id = ?",
            [userId],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },

    validateUserDetails: (userDetails) => {
        let validationErrors = [];

        if (!userDetails.first_name || !userDetails.last_name || !userDetails.gender || !userDetails.city || !userDetails.street || !userDetails.house_number || !userDetails.phone_number) {
            validationErrors.push('All fields must be completed.');
        }

        if (/\d/.test(userDetails.first_name)) {
            validationErrors.push('First name cannot contain numbers.');
        }

        if (typeof userDetails.first_name !== 'string') {
            validationErrors.push('First name must be a string.');
        }

        if (/\d/.test(userDetails.last_name)) {
            validationErrors.push('Last name cannot contain numbers.');
        }

        if (typeof userDetails.last_name !== 'string') {
            validationErrors.push('Last name must be a string.');
        }

        if (typeof userDetails.gender !== 'string') {
            validationErrors.push('Gender must be a string.');
        }

        if (typeof userDetails.city !== 'string') {
            validationErrors.push('City must be a string.');
        }

        if (typeof userDetails.street !== 'string') {
            validationErrors.push('Street must be a string.');
        }

        if (typeof userDetails.house_number === 'string' || isNaN(Number(userDetails.house_number))) {
            validationErrors.push('House number must be a number.');
        }

        if (!/^\+\d{2} \d{3} \d{2} \d{2} \d{2}$/.test(userDetails.phone_number)) {
            validationErrors.push('Phone number must follow the format "+32 444 44 44 44".');
        }

        return validationErrors.length > 0 ? validationErrors : null;
    },

    searchUsers: (searchParams, callback) => {
        let searchQuery = 'SELECT * FROM User WHERE ';
        let conditionsCount = 0;
        let queryValues = [];

        for (let field in searchParams) {
            if (conditionsCount !== 0) {
                searchQuery += 'AND ';
            }
            searchQuery += `${field} LIKE ? `;
            queryValues.push(`%${searchParams[field]}%`);
            conditionsCount++;
        }

        database.query(searchQuery, queryValues, (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    sortUsers: (sortBy, sortDirection, callback) => {
        let sortQuery = `SELECT * FROM User ORDER BY ${sortBy} ${sortDirection}`;

        database.query(sortQuery, (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    paginateUsers: (limit, offset, callback) => {
        let paginationQuery = `SELECT * FROM User LIMIT ? OFFSET ?`;

        database.query(paginationQuery, [limit, offset], (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    findUserByFirstName: (firstName, callback) => {
        let findQuery = `SELECT * FROM User WHERE first_name LIKE ?`;

        database.query(findQuery, [`%${firstName}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
}
