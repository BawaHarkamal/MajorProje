const express = require('express');
const checkLowStock = require('../utils/lowStockChecker');

const router = express.Router();

router.get('/low-stock', async (req, res) => {
    try {
        const lowStockMedicines = await checkLowStock();
        if (lowStockMedicines.length === 0) {
            return res.status(200).json({ message: 'No medicines are low on stock.' });
        }
        res.status(200).json(lowStockMedicines);
    } catch (error) {
        console.error('Error in low stock API:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

