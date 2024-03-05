const pool = require("../database/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken');

function getUsers() {
  return pool
    .query("SELECT * FROM employee")
    .then((results) => results)
    .catch((err) => {
      throw new Error(`Error fetching users: ${err.message}`);
    });
}

async function registerUser(username, email, mobile, password) {
  console.log(mobile);
  // Validate fields
  if (!username || !email ||!mobile || !password ) {
    return { message: "All fields are required", status: "error" };
  }

  if (!validator.isAlphanumeric(username)) {
    return {
      message: "Username must contain only alphanumeric characters",
      status: "error",
    };
  }
  if (!validator.isEmail(email)) {
    return { message: "Invalid email format", status: "error" };
  }
  if (!validator.isMobilePhone(mobile, "any")) {
    return { message: "Invalid phone number format", status: "error" };
  }

  if (password.length < 6) {
    return {
      message: "Password must be at least 6 characters long",
      status: "error",
    };
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if email is unique
  const [existingUser] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (existingUser.length > 0) {
    return { message: "Email is already registered", status: 400 };
  }

  // Insert user into the database
  try {
    const result = await pool.query(
      "INSERT INTO users (username, email,mobile, password) VALUES (?, ?, ?,?)",
      [username, email,mobile, hashedPassword]
    );
    return { message: "User registered successfully", status: "success" };
  } catch (err) {
    return { message: "Error registering user", status: "error", error: err };
  }
}


async function loginUser(email, password) {
  // Validate fields
  if (!email || !password) {
    return { message: 'Email and password are required', status: 'error' };
  }

  // Check if user exists
  const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser.length === 0) {
    return { message: 'User not found', status: 'error' };
  }

  // Verify password
  const match = await bcrypt.compare(password, existingUser[0].password);
  if (!match) {
    return { message: 'Invalid credentials', status: 'error' };
  }
console.log(existingUser[0]);
  // Generate JWT token
  const token = jwt.sign({ id: existingUser[0].id, email: existingUser[0].email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { message: 'Login successful', status: 'success', token };
}

async function getUserDetails(token) {

  try {
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken,'dt');
    // Verify the JWT token
  
    const userId = decodedToken.email;
console.log(userId);
    // Retrieve user details from the database
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [userId]);
    if (user.length === 0) {
      return { message: 'User not found', status: 'error' };
    }
    // // Remove sensitive information like password before returning user details
    const userDetails = { id: user[0].id, username: user[0].username, email: user[0].email, mobile: user[0].mobile };
    return { message: 'User details retrieved successfully', status: 'success', user: userDetails };
  } catch (err) {
    return { message: 'Error retrieving user details', status: 'error', error: err.message };
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserDetails
};
