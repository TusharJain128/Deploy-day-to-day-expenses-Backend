const express = require("express");

const {registerUser,loginUser} = require("../../controllers/userController");

const router = express.Router();

/**
 * @route   Post api/user
 * @desc    Create user
 * @access  Public
 */
router.post("/createUser", registerUser);

/**
 * @route   Post api/user
 * @desc    Login user
 * @access  Public
 */
router.post("/loginUser", loginUser);

module.exports = router;