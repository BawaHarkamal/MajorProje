// models/InventoryItem.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the InventoryItem schema
const inventoryItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: 'Partner' }, // link to supplier
    createdAt: { type: Date, default: Date.now }
});

// Create and export the InventoryItem model
module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
