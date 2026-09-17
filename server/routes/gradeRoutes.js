const express = require("express");
const Grade = require("../models/Grade.js");

const router = express.Router();

// ADD GRADE
router.post("/", async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();

    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// GET ALL GRADES
router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("student")
      .populate("course");

    res.json(grades);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE GRADE
router.put("/:id", async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    )
      .populate("student")
      .populate("course");

    if (!grade) {
      return res.status(404).json({
        message: "Grade not found",
      });
    }

    res.json(grade);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE GRADE
router.delete("/:id", async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);

    if (!grade) {
      return res.status(404).json({
        message: "Grade not found",
      });
    }

    res.json({
      message: "Grade deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;