const express = require("express");
const authenticateUser = require("../services/authService");
const businessController = require("../controllers/businessController");

const router = express.Router();

router.get("/", businessController.getBusiness);
router.post("/add-business", authenticateUser, businessController.addBusiness);
router.get(
  "/get-business",
  authenticateUser,
  businessController.getBusinessesByUserID
);

module.exports = router;
