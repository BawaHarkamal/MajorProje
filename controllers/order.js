// Orders allow consumers to purchase medicines from retailers, track delivery status, and update order details

const Order = require('../models/order');
const Medicine = require('../models/medicine'); // ✅ Import Medicine Model
const multer = require('multer');

// Configure Multer for prescription uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save prescriptions in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ✅ Create an order & update stock
exports.placeOrder = async (req, res) => {
    try {
        const { consumerId, medicineId, quantity } = req.body;

        // Check if prescription file exists
        if (!req.file) {
            return res.status(400).json({ error: 'Prescription is required' });
        }

        // ✅ Fetch the medicine & check stock
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        if (medicine.stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock available' });
        }

        // ✅ Deduct stock
        medicine.stock -= quantity;
        await medicine.save();

        // ✅ Create the order
        const newOrder = new Order({
            consumerId,
            medicineId,
            quantity,
            prescription: req.file.path // Save prescription path
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully & stock updated', order: newOrder });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get orders by user role
exports.getOrders = async (req, res) => {
    try {
        const { userId, role } = req.query;
        let orders;

        if (role === 'Consumer') {
            orders = await Order.find({ consumerId: userId }).populate('medicine retailerId');
        } else if (role === 'Retailer') {
            orders = await Order.find({ retailerId: userId }).populate('medicine consumerId');
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
