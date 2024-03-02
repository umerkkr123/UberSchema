//This is for document structure 
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['credit card', 'paypal', 'cash'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});



const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;