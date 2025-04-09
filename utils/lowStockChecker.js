const Medicine = require('../models/medicine'); // Ensure the correct model

// Function to check for low stock medicines
const checkLowStock = async () => {
    try {
        const threshold = 10; // Adjust threshold as needed
        const lowStockMedicines = await Medicine.find({ stock: { $lt: threshold } });

        return lowStockMedicines;
    } catch (error) {
        console.error('Error checking low stock:', error);
        return [];
    }
};

module.exports = checkLowStock;