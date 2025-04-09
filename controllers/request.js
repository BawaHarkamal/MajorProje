// Retailers can request medicines from suppliers, and manufacturers can request salt compounds.


const Request = require('../models/requestModel');

// Create a request
exports.createRequest = async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get requests by role
exports.getRequests = async (req, res) => {
    try {
        const { role, userId } = req.query;
        let filter = {};

        if (role === 'Retailer') filter.retailerId = userId;
        if (role === 'Supplier') filter.supplierId = userId;
        if (role === 'Manufacturer') filter.manufacturerId = userId;

        const requests = await Request.find(filter);
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve or reject a request
exports.updateRequestStatus = async (req, res) => {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json({ message: 'Request updated successfully', request: updatedRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
