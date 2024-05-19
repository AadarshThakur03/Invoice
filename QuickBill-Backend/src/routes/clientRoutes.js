const express = require("express");
const authenticateUser = require("../services/authService");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.get("/", clientController.getClient);
router.post("/add-client", authenticateUser, clientController.addClient);
router.get("/get-client", authenticateUser, clientController.getClientByUserID);

module.exports = router;
