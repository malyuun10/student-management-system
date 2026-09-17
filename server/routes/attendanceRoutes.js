const express = require("express");
const Attendance = require("../models/attendance.js");

const router = express.Router();

// ADD ATTENDANCE
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();

    const savedAttendance = await Attendance.findById(attendance._id)
      .populate("student");

    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// GET ALL ATTENDANCE
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE ATTENDANCE
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    ).populate("student");

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE ATTENDANCE
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.json({
      message: "Attendance deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;