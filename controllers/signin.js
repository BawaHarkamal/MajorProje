// controllers/signin.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    // Validate email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send('A valid email is required.');
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send the token to the client
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
