// controllers/signup.js
const { Admin, Consumer, Producer, Supplier, Retailer } = require('../models/userModel');

exports.signup = async (req, res) => {
    const { name, email, password, role, licenseNumber, storeName } = req.body;

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
    if (!['admin', 'consumer', 'producer', 'supplier', 'retailer'].includes(role)) {
        return res.status(400).send('Invalid role.');
    }
    if (role === 'supplier' && (!licenseNumber || typeof licenseNumber !== 'string')) {
        return res.status(400).send('License number is required for suppliers.');
    }
    if (role === 'retailer' && (!storeName || typeof storeName !== 'string')) {
        return res.status(400).send('Store name is required for retailers.');
    }

    try {
        let user;
        switch (role) {
            case 'admin':
                user = new Admin({ name, email, password, role });
                break;
            case 'consumer':
                user = new Consumer({ name, email, password, role });
                break;
            case 'producer':
                user = new Producer({ name, email, password, role });
                break;
            case 'supplier':
                user = new Supplier({ name, email, password, role, licenseNumber });
                break;
            case 'retailer':
                user = new Retailer({ name, email, password, role, storeName });
                break;
        }

        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
