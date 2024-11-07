// controllers/signup.js
const User = require('../models/userModel');

exports.signup = async (req, res) => {
    const { name, email, password, role, gst } = req.body;

    // Manual validation
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).send('Name is required and should be at least 3 characters long.');
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send('A valid email is required.');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).send('Password is required and should be at least 6 characters long.');
    }
    if (!['Supplier', 'Retailer', 'Consumer', 'Manufacturer'].includes(role)) {
        return res.status(400).send('Invalid role.');
    }
    if ((role === 'Supplier' || role === 'Retailer' || role === 'Manufacturer') && (!gst || typeof gst !== 'string')) {
        return res.status(400).send('GST is required for suppliers, retailers, and manufacturers.');
    }

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists.');
        }

        // Create a new user
        const user = new User({
            name,
            email,
            password,
            role,
            gst: role !== 'Consumer' ? gst : undefined // GST is only for Supplier, Retailer, and Manufacturer
        });

        // Save the user to the database
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
