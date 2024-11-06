const mongoose = require('mongoose');
const baseOptions = {
    discriminatorKey: 'role', // Adds the 'role' field automatically
    collection: 'users', // Stores all roles in the same collection
};

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, baseOptions);

const User = mongoose.model('User', userSchema);

const Supplier = User.discriminator('Supplier', new mongoose.Schema({
    licenseNumber: { type: String, required: true },
    inventory: [{ 
        drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug' },
        quantity: Number
    }],
}));

const Consumer = User.discriminator('Consumer', new mongoose.Schema({
    purchaseHistory: [{ 
        drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug' },
        purchaseDate: Date
    }],
}));
