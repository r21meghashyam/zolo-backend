const express = require("express");
const router = express.Router();

const Users = require("../controllers/users");

router.post('/login',Users.login);

router.post('/register',Users.register);

module.exports = router;