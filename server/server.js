const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const gradeRoutes = require("./routes/gradeRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Student routes
app.use("/students", studentRoutes);

// Course routes
app.use("/courses", courseRoutes);

// Attendance routes
app.use("/attendance", attendanceRoutes);

// Grade routes
app.use("/grades", gradeRoutes);

// User routes
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/student-management-system");

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});