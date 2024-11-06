// routes/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config(); // Load environment variables from .env file

const signup = async (req, res) => {
  // Validate and sanitize input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate role input
    const validRoles = ['user', 'admin', 'supplier', 'producer']; 
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with the correct model based on role
    let newUser;
    if (role === 'supplier') {
      newUser = new Supplier({
        name,
        email,
        password: hashedPassword,
        role: 'supplier',
      });
    } else if (role === 'producer') {
      newUser = new Producer({
        name,
        email,
        password: hashedPassword,
        role: 'producer',
      });
    } else if (role === 'admin') {
      newUser = new Admin({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
      });
    } else {
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'user',
      });
    }

    await newUser.save();

    // Generate JWT token with userId and role
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = signup;
