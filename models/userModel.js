// models/userModel.js
const mongoose = require('mongoose');

// Base schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'supplier', 'producer'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Virtual field to access user's full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Create the base User model
const User = mongoose.model('User', userSchema);

// Admin Schema - Inherits from User schema
const adminSchema = new mongoose.Schema(
  {
    // Admin-specific fields can be added here if necessary
  },
  {
    timestamps: true,
  }
);
const Admin = User.discriminator('Admin', adminSchema);

// Producer Schema - Inherits from User schema
const producerSchema = new mongoose.Schema(
  {
    productionType: {
      type: String,
      required: true,
    },
    // Producer-specific fields can be added here
  },
  {
    timestamps: true,
  }
);
const Producer = User.discriminator('Producer', producerSchema);

// Supplier Schema - Inherits from User schema
const supplierSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    // Supplier-specific fields can be added here
  },
  {
    timestamps: true,
  }
);
const Supplier = User.discriminator('Supplier', supplierSchema);

// Export the models
module.exports = { User, Admin, Producer, Supplier };
