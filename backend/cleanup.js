const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const allUsers = await User.find({}).sort({ createdAt: 1 });
  console.log(`Total users: ${allUsers.length}`);

  const admin = allUsers.find(u => u.role === "admin");
  const instructor = allUsers.find(u => u.role === "instructor");
  const student = allUsers.find(u => u.role === "student");

  const keepIds = [admin?._id, instructor?._id, student?._id].filter(Boolean).map(id => id.toString());

  const toDelete = allUsers.filter(u => !keepIds.includes(u._id.toString()));
  for (const u of toDelete) {
    await User.findByIdAndDelete(u._id);
    console.log(`Deleted: ${u.email} (${u.role})`);
  }

  const remaining = await User.find({});
  console.log("\nRemaining users:");
  remaining.forEach(u => console.log(`  ${u.role}: ${u.email}`));
  process.exit();
}).catch(e => { console.error(e); process.exit(1); });
