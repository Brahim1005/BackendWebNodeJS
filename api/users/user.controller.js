const { json } = require("express");
const { addUser, fetchUserById, modifyUser, fetchAllUsers, removeUser, searchUsers, sortUsers, fetchUsersWithPagination, searchUserByFirstName } = require("./user.service");
const validateUserInput = require('../validation/userValidation');

module.exports = {
    // Add a new user
    // POST: http://localhost:3000/api/users
    /*
        Example to put in POSTMAN to create an user :
        {
            "first_name": "Remco",
            "last_name": "Evenepoel",
            "gender": "Man",
            "city": "Dilbeek",
            "street": "Fietsesteenweg",
            "houseNr": 89,
            "phoneNr": "+32 497 54 65 45"
        }
    */
    addUser: (req, res) => {
        const validationErrors = validateUserInput(req.body);
        if (validationErrors) {
            return res.status(400).json({ validationErrors });
        }

        const userData = req.body;
        addUser(userData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // Retrieve a specific user by ID
    // GET: http://localhost:3000/api/users/{id}
    fetchUserById: (req, res) => {
        const userId = req.params.id;
        fetchUserById(userId, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    // Retrieve all users
    // GET: http://localhost:3000/api/users
    fetchAllUsers: (req, res) => {
        fetchAllUsers((err, results) => {
            if (err) {
                console.error(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    // Update user information
    // PUT: http://localhost:3000/api/users/{id}
    modifyUser: (req, res) => {
        const userData = req.body;
        const userId = req.params.id;

        const validationErrors = validateUserInput(userData);
        if (validationErrors) {
            return res.status(400).json({ validationErrors });
        }

        modifyUser(userId, userData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "User updated successfully"
            });
        });
    },

    // Delete a user by ID
    // DELETE: http://localhost:3000/api/users/{id}
    removeUser: (req, res) => {
        const userId = req.params.id;
        removeUser(userId, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            if (!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "User successfully deleted"
            });
        });
    },

    // Advanced user search with multiple filters
    // GET: http://localhost:3000/api/users/search?gender=Man&last_name=Evenepoel&city=Dilbeek&first_name=Remco
    searchUsers: (req, res) => {
        const queryParams = req.query;

        searchUsers(queryParams, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // Order users by specified fields
    // GET: http://localhost:3000/api/users/order?field=first_name,city&direction=asc
    sortUsers: (req, res) => {
        const sortField = req.query.field;
        const sortDirection = req.query.direction;

        sortUsers(sortField, sortDirection, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // Paginate users with limit and offset
    // GET: http://localhost:3000/api/users/fetchUsersWithPagination?limit=2&offset=2
    fetchUsersWithPagination: (req, res) => {
        const limit = parseInt(req.query.limit) || 3;
        const offset = parseInt(req.query.offset) || 3;
        fetchUsersWithPagination(limit, offset, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    // Search users by first name
    // GET: http://localhost:3000/api/users/searchUserByFirstName?searchValue=Remco
    searchUserByFirstName: (req, res) => {
        const searchValue = req.query.searchValue;
        console.log('Search Value:', searchValue);

        searchUserByFirstName(searchValue, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to the database"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "No users found with the specified first name"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}
