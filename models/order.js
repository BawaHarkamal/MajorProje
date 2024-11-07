const orderSchema = new mongoose.Schema({
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicine: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true }],
    retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
    datePurchase: { type: Date, required: true },
    deliveryDate: { type: Date },
    price: { type: Number, required: true }
  });
  
  module.exports = mongoose.model('Order', orderSchema);  