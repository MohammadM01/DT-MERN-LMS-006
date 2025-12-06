const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const createCourse = async (req, res) => {
    try {
        const { title, description, price, category, difficulty } = req.body;
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : '';
        const newCourse = new Course({
            title,
            description,
            price,
            category,
            difficulty,
            thumbnail,
            instructor: req.user.id,
        });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name email');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 });
        res.status(200).json({ ...course.toObject(), lessons });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const addLesson = async (req, res) => {
    try {
        const { courseId, title, order, description } = req.body;
        const videoUrl = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : '';
        const pdfUrl = req.files['pdf'] ? `/uploads/${req.files['pdf'][0].filename}` : '';
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const newLesson = new Lesson({
            courseId,
            title,
            videoUrl,
            pdfUrl,
            order,
            description
        });
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        const course = await Course.findById(lesson.courseId);
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await Lesson.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const updateLesson = async (req, res) => {
    try {
        const { title, description, order } = req.body;
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        const course = await Course.findById(lesson.courseId);
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        lesson.title = title || lesson.title;
        lesson.description = description || lesson.description;
        lesson.order = order || lesson.order;
        if (req.files && req.files['video']) {
            lesson.videoUrl = `/uploads/${req.files['video'][0].filename}`;
        }
        if (req.files && req.files['pdf']) {
            lesson.pdfUrl = `/uploads/${req.files['pdf'][0].filename}`;
        }
        await lesson.save();
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (req.user.role !== 'admin' && course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    addLesson,
    getInstructorCourses,
    deleteLesson,
    updateLesson,
    deleteCourse
};
