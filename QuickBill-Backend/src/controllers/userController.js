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
    const { username, email,mobile, password } = req.body;
    try {
      const result = await userService.registerUser(username, email,mobile, password);
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
  async function getUserDetails (req, res) {

    // const token = req.headers.authorization;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token,'hi');
    if (!token) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    try {
      const result = await userService.getUserDetails(token);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserDetails
};