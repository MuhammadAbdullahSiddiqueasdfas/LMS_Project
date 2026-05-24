const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authroutes = require("./routes/authroutes");
const courseroutes = require("./routes/courseroutes");
const userroutes = require("./routes/userroutes");
const enrollroutes = require("./routes/enrollroutes");
const { notFound, errorHandler } = require("./middleware/errormiddleware");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.json({ success: true, message: "LMS API is running" });
});

app.use("/api/auth", authroutes);
app.use("/api/courses", courseroutes);
app.use("/api/users", userroutes);
app.use("/api/enroll", enrollroutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
