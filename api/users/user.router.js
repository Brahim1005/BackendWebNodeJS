const express = require('express');
const router = require("express").Router();
const {addUser , fetchAllUsers , searchUsers, sortUsers , fetchUsersWithPagination, searchUserByFirstName, fetchUserById, modifyUser, removeUser} = require("./user.controller");


router.post("/",addUser); 
router.get("/", fetchAllUsers); 
router.get("/search", searchUsers);
router.get("/order", sortUsers);
router.get("/limit", fetchUsersWithPagination);
router.get("/searchFirstName" , searchUserByFirstName);

router.get("/:id", fetchUserById); 
router.put("/:id", modifyUser); 
router.delete("/:id", removeUser); 





module.exports = router; 