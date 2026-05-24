const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson, getInstructorCourses } = require("../controllers/coursecontroller");
const { protect } = require("../middleware/authmiddleware");
const { authorize } = require("../middleware/rolemiddleware");

router.get("/", getAllCourses);
router.get("/instructor/my-courses", protect, authorize("instructor"), getInstructorCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.put("/:id", protect, authorize("instructor", "admin"), updateCourse);
router.delete("/:id", protect, authorize("instructor", "admin"), deleteCourse);
router.post("/:id/lessons", protect, authorize("instructor"), addLesson);

module.exports = router;
