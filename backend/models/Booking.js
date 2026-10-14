const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: String,
  date: String,
});

module.exports = mongoose.model("Booking", bookingSchema);