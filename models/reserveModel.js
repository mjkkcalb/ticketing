// postModel.js
const mongoose = require("mongoose");

// Reserve 스키마 정의
const reserveSchema = new mongoose.Schema({
  eventData: Object,
  selectedDate: Date,
  numberOfPeople: Number,
});

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;
