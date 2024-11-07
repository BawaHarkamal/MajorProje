const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MedicineRequest', 'SaltRequest'],
    required: true
  },
  status: { type: String, required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  manufacturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  salt: { type: String }
});

module.exports = mongoose.model('Request', requestSchema);
