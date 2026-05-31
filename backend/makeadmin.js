require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({ email: { $in: ["admin@abdrax.com", "admin_1779605450688@test.com"] } });
  const admin = await User.create({ name: "Admin", email: "admin@abdrax.com", password: "admin123", role: "admin" });
  console.log("Admin created:", admin.email);
  const all = await User.find({}, "name email role");
  console.log("\nAll users:");
  all.forEach(u => console.log(` ${u.role}: ${u.email}`));
  process.exit();
}).catch(e => { console.error(e.message); process.exit(1); });
