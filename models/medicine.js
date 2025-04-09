const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salts: { type: [String], required: true },
    expiryDate: { type: Date, required: true },
    manuDate: { type: Date, required: true },
    mrp: { type: Number, required: true },
    producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stock: { type: Number, required: true, default: 0 } // Track available stock
});

module.exports = mongoose.model('Medicine', medicineSchema);
