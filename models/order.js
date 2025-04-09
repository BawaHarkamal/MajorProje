const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  prescription: { type: String, required: true }, // ✅ Prescription file (URL or Base64)
  createdAt: { type: Date, default: Date.now }
});
// const orderSchema = new mongoose.Schema({
//     consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     medicine: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true }],
//     retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     status: { type: String, required: true },
//     datePurchase: { type: Date, required: true },
//     deliveryDate: { type: Date },
//     price: { type: Number, required: true }
//   });
  
  module.exports = mongoose.model('Order', orderSchema);  




  