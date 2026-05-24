const Enrollment = require("../models/enrollment");
const Course = require("../models/course");

const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }
    const course = await Course.findById(courseId);
    if (!course || !course.isPublished) {
      return res.status(404).json({ success: false, message: "Course not found or not available" });
    }
    const existing = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (existing) {
      return res.status(409).json({ success: false, message: "You are already enrolled in this course" });
    }
    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });
    await enrollment.populate("course", "title description thumbnail");
    res.status(201).json({ success: true, message: `Successfully enrolled in "${course.title}"`, enrollment });
  } catch (error) {
    next(error);
  }
};

const getMyCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: "course",
        select: "title description thumbnail category instructor",
        populate: { path: "instructor", select: "name" },
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enrollments.length, enrollments });
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    const { progress } = req.body;
    enrollment.progress = progress;
    if (progress >= 100) enrollment.isCompleted = true;
    await enrollment.save();
    res.status(200).json({ success: true, message: "Progress updated", progress: enrollment.progress, isCompleted: enrollment.isCompleted });
  } catch (error) {
    next(error);
  }
};

module.exports = { enrollCourse, getMyCourses, updateProgress };
