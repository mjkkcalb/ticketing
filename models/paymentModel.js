// postModel.js
const mongoose = require("mongoose");

// Reserve 스키마 정의
const paymentSchema = new mongoose.Schema({
  eventData: Object,
  selectedDate: Date,
  numberOfPeople: Number,
  paymentMethod: String,
  paymentTime: Date,
  totalPrice: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
