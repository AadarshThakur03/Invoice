const clientService = require("../services/clientService");

async function getClient(req, res) {
  try {
    const users = await clientService.getClient();
    res.json(users);
  } catch (err) {
    res.status(500).send(`Error fetching users: ${err.message}`);
  }
}

async function addClient(req, res) {
  const clientData = req.body;
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ error: "Empty request!!" });
  }
  try {
    const result = await clientService.registerClient(clientData, req.userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getClientByUserID(req, res) {
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  try {
    const result = await clientService.getClientByUserID(req.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addClient,
  getClient,
  getClientByUserID,
};
