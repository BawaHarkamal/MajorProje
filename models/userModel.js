// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gst: { type: String, required: function() { return this.role !== 'Consumer'; } },
  role: {
    type: String,
    enum: ['Supplier', 'Retailer', 'Consumer', 'Manufacturer'],
    required: true
  },
  currentMeds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Medicine', required: function() { return this.role === 'Retailer'; } }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
