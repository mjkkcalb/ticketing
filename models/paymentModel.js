// postModel.js
const mongoose = require("mongoose");

// Reserve 스키마 정의
const paymentSchema = new mongoose.Schema({
  eventData: Object,
  selectedDate: Date,
  numberOfPeople: Number,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
