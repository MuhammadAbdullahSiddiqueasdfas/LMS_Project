const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const all = await User.find({}).lean();
  console.log("Total before:", all.length);

  const toDelete = [];

  // Remove users with no role or unknown role
  for (const u of all) {
    if (!u.role || !["student", "instructor", "admin"].includes(u.role)) {
      toDelete.push(u._id);
      console.log("Remove unknown:", u.email);
    }
  }

  // Keep only ONE admin — delete extras
  const admins = all.filter(u => u.role === "admin");
  if (admins.length > 1) {
    const keepAdmin = admins.find(a => a.email === "admin@abdrax.com") || admins[0];
    for (const a of admins) {
      if (a._id.toString() !== keepAdmin._id.toString()) {
        toDelete.push(a._id);
        console.log("Remove extra admin:", a.email);
      }
    }
  }

  if (toDelete.length > 0) {
    await User.deleteMany({ _id: { $in: toDelete } });
    console.log("Deleted:", toDelete.length, "users");
  } else {
    console.log("Nothing to delete");
  }

  const remaining = await User.find({}).lean();
  console.log("\nRemaining users:");
  remaining.forEach(u => console.log(` ${u.role}: ${u.email}`));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
