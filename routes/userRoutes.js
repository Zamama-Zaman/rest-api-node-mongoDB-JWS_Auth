const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { 
    registerUser,
    loginUser,
    getUser,
} = require("../controllers/userController");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getUser);

module.exports = router;