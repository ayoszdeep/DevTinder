require("dns").setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Attempting to connect to:", process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected successfully");
};

module.exports = connectDB;