const checkLowStock = require('../utils/lowStockChecker');
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine');
const { authenticate, authorize } = require('../middlewares/auth'); // Ensure only authorized users access this
// Route to add a new medicine
router.post('/add', medicineController.addMedicine);

// Route to get medicines with pagination
router.get('/', medicineController.getMedicines);

// Route to update a medicine by ID
router.put('/:id', medicineController.updateMedicine);

// Route to delete a medicine by ID
router.delete('/:id', medicineController.deleteMedicine);

router.put('/update-stock', medicineController.updateStock);

router.get('/stock/:id', medicineController.getStock);


module.exports = router;
