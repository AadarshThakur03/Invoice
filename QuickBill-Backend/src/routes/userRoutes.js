const express = require("express");
const userController = require("../controllers/userController");
const hsnCodeController = require("../controllers/hsnCodeController");
const authenticateUser = require("../services/authService");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get-userDetails", authenticateUser, userController.getUserDetails);
router.get("/get-hsnCode", authenticateUser, hsnCodeController.getHsnCodesByUserID);
router.post("/add-hsnCode", authenticateUser, hsnCodeController.addHsnCode);
router.get("/get-hsnCode/:hsnCode/:id", authenticateUser, hsnCodeController.getHsnCodeByNameAndUserId);
router.get("/get-trialRemaingDays", authenticateUser, userController.getTrialRemainingDays);

module.exports = router;
