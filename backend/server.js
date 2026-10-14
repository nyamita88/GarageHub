const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/garage-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const Booking = require("./models/Booking");

// Save booking
app.post("/bookings", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
});

// Get bookings
app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.listen(5000, () => {
  console.log(" 🚀 Server running on port 5000");
});