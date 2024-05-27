const express = require("express");
const authenticateUser = require("../services/authService");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.get("/", itemController.getItems);
router.post("/add-item", authenticateUser, itemController.addItem);
router.get("/get-items", authenticateUser, itemController.getItemsByUserID);

module.exports = router;
