const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salts: { type: [String], required: true },
    expiryDate: { type: Date, required: true },
    manuDate: { type: Date, required: true },
    mrp: { type: Number, required: true },
    producerName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  module.exports = mongoose.model('Medicine', medicineSchema);  