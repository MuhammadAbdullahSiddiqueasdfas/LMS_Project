const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const existing = await User.findOne({ email: "admin@abdrax.com" });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit();
  }
  const admin = await User.create({
    name: "Admin",
    email: "admin@abdrax.com",
    password: "admin123",
    role: "admin",
  });
  console.log("Admin created successfully:", admin.email);
  process.exit();
}).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
