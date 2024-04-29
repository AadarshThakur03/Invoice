const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  // Extract the JWT token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  
  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Extract the user ID from the decoded token and attach it to the request object
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = authenticateUser;
