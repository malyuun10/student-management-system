const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes.js");

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/students", studentRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/student-management-system");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});