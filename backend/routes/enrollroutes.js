const express = require("express");
const router = express.Router();
const { enrollCourse, getMyCourses, updateProgress } = require("../controllers/enrollcontroller");
const { protect } = require("../middleware/authmiddleware");
const { authorize } = require("../middleware/rolemiddleware");

router.post("/", protect, authorize("student"), enrollCourse);
router.get("/my-courses", protect, authorize("student"), getMyCourses);
router.put("/:enrollmentId/progress", protect, authorize("student"), updateProgress);

module.exports = router;
