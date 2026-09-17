const express = require("express");
const Student = require("../models/student.js");

const router = express.Router();

// ADD STUDENT
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL STUDENTS + COURSE
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("course");

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    ).populate("course");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;