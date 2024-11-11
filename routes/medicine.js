const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine');

// Route to add a new medicine
router.post('/', medicineController.addMedicine);

// Route to get medicines with pagination
router.get('/', medicineController.getMedicines);

// Route to update a medicine by ID
router.put('/:id', medicineController.updateMedicine);

// Route to delete a medicine by ID
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
