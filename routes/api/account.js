const express = require("express");

const {CreateDetails, updateDetails, getDetails, deleteDetails, getDetailsById} = require("../../controllers/accountController");
const { authentication, autherisation } = require("../../middleware/middleware");

const router = express.Router();

/**
 * @route   Post api/account
 * @desc    Create account
 * @access  Public
 */
router.post("/createDetails", authentication, CreateDetails);

/**
 * @route   Put api/account
 * @desc    Update account
 * @access  Public
 */
router.post("/updateDetails/:accountId", authentication, autherisation, updateDetails);

/**
 * @route   get api/account
 * @desc    get accounts
 * @access  Public
 */
router.get("/getDetails", authentication, getDetails);

/**
 * @route   get api/account/id
 * @desc    get account
 * @access  Public
 */
router.get("/getDetails/:accountId", authentication, autherisation, getDetailsById);

/**
 * @route   delete api/account
 * @desc    delete detail
 * @access  Public
 */
router.delete("/deleteDetail/:accountId", authentication, autherisation, deleteDetails);


module.exports = router;