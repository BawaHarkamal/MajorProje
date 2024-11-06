// controllers/signup.js
const { Admin, Consumer, Producer, Supplier, Retailer } = require('../models/userModel');

exports.signup = async (req, res) => {
    const { name, email, password, role, licenseNumber, storeName } = req.body;

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
                if (!licenseNumber) return res.status(400).send('License number is required for suppliers');
                user = new Supplier({ name, email, password, role, licenseNumber });
                break;
            case 'retailer':
                if (!storeName) return res.status(400).send('Store name is required for retailers');
                user = new Retailer({ name, email, password, role, storeName });
                break;
            default:
                return res.status(400).send('Invalid role');
        }

        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
