// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Base schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'consumer', 'producer', 'supplier', 'retailer'], required: true },
});

// Password hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Password validation method
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Discriminators for role-based schemas
const Admin = User.discriminator('Admin', new mongoose.Schema({}));
const Consumer = User.discriminator('Consumer', new mongoose.Schema({}));
const Producer = User.discriminator('Producer', new mongoose.Schema({}));
const Supplier = User.discriminator('Supplier', new mongoose.Schema({
    licenseNumber: { type: String, required: true },
}));
const Retailer = User.discriminator('Retailer', new mongoose.Schema({
    storeName: { type: String, required: true },
}));

module.exports = { User, Admin, Consumer, Producer, Supplier, Retailer };
