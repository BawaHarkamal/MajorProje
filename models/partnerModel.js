// models/Partner.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Partner schema
const partnerSchema = new Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ['supplier', 'pharmacy'], required: true }, // distinguish supplier and pharmacy
    inventory: [{ type: Schema.Types.ObjectId, ref: 'InventoryItem' }], // assuming inventory items are tracked
    createdAt: { type: Date, default: Date.now }
});

// Create and export the Partner model
module.exports = mongoose.model('Partner', partnerSchema);
