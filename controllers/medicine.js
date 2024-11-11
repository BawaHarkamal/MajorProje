const Medicine = require('../models/medicine');

// Add new medicine
exports.addMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        res.status(201).json({ message: 'Medicine added successfully', medicine: newMedicine });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get medicines with pagination
exports.getMedicines = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    try {
        const medicines = await Medicine.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('producerName', 'name'); // Populating producer name
        const total = await Medicine.countDocuments();
        
        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalMedicines: total,
            medicines
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a medicine
exports.updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMedicine) return res.status(404).json({ message: 'Medicine not found' });

        res.json({ message: 'Medicine updated successfully', medicine: updatedMedicine });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a medicine
exports.deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) return res.status(404).json({ message: 'Medicine not found' });

        res.json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
