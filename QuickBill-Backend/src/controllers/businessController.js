const businessService = require("../services/businessService");

async function getBusiness(req, res) {
  try {
    const users = await businessService.getBusiness();
    res.json(users);
  } catch (err) {
    res.status(500).send(`Error fetching users: ${err.message}`);
  }
}

async function addBusiness(req, res) {
  const businessData = req.body;
  console.log(req.userId, "addBusiness");
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ error: "Empty request!!" });
  }
  try {
    const result = await businessService.registerBusiness(
      businessData,
      req.userId
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBusinessesByUserID(req, res) {
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  try {
    const result = await businessService.getBusinessesByUserID(req.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addBusiness,
  getBusiness,
  getBusinessesByUserID
};
