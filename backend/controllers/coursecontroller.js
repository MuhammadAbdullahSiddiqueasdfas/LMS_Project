const Course = require("../models/course");

const getAllCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const isAdmin = req.user && req.user.role === "admin";
    const filter = isAdmin ? {} : { isPublished: true };
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .select("-lessons")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: "Title, description, and category are required" });
    }
    const course = await Course.create({ title, description, category, price, thumbnail, instructor: req.user._id });
    res.status(201).json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to update this course" });
    }
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("instructor", "name email");
    res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this course" });
    }
    await course.deleteOne();
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const addLesson = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to add lessons to this course" });
    }
    const { title, content, videoUrl } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Lesson title is required" });
    }
    course.lessons.push({ title, content, videoUrl, order: course.lessons.length + 1 });
    await course.save();
    res.status(201).json({ success: true, message: "Lesson added successfully", lessons: course.lessons });
  } catch (error) {
    next(error);
  }
};

const getInstructorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson, getInstructorCourses };
