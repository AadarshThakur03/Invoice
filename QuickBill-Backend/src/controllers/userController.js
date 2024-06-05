const userService = require('../services/userService');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(`Error fetching users: ${err.message}`);
  }
}
async function registerUser(req, res) {
  const { username, email, mobile, password } = req.body;
  try {
    const result = await userService.registerUser(username, email, mobile, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}
async function getUserDetails(req, res) {
  try {
    const result = await userService.getUserDetails(req.email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getTrialRemainingDays(req, res) {
  if (req.userId == "" || req.userId == undefined || req.email == "") {
    return res.json({ error: "Invalid User" });
  }
  try {
    const result = await userService.getTrialRemainingDays(req.email);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserDetails,
  getTrialRemainingDays
};