const Enrollment = require('../models/Enrollment');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled' });
        }
        const enrollment = new Enrollment({ userId, courseId });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user.id }).populate('courseId');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const updateProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;
        const userId = req.user.id;
        const enrollment = await Enrollment.findOne({ userId, courseId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Not enrolled' });
        }
        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);
            const totalLessons = await Lesson.countDocuments({ courseId });
            enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;
            if (enrollment.progress === 100) {
                enrollment.isCompleted = true;
                enrollment.completionDate = new Date();
            }
            await enrollment.save();
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getCertificate = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        const enrollment = await Enrollment.findOne({ userId, courseId }).populate('courseId').populate('userId');
        if (!enrollment || !enrollment.isCompleted) {
            return res.status(400).json({ message: 'Course not completed' });
        }
        const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
        const filename = `certificate-${userId}-${courseId}.pdf`;
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        doc.pipe(fs.createWriteStream(filePath));
        doc.pipe(res);
        doc.font('Helvetica-Bold').fontSize(30).text('CERTIFICATE OF COMPLETION', { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text('This satisfies that', { align: 'center' });
        doc.moveDown();
        doc.fontSize(25).fillColor('blue').text(enrollment.userId.name, { align: 'center' });
        doc.moveDown();
        doc.fillColor('black').fontSize(20).text('Has successfully completed the course', { align: 'center' });
        doc.moveDown();
        doc.fontSize(25).fillColor('blue').text(enrollment.courseId.title, { align: 'center' });
        doc.moveDown();
        doc.fillColor('black').fontSize(15).text(`Date: ${enrollment.completionDate.toDateString()}`, { align: 'center' });
        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getEnrollmentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        const enrollment = await Enrollment.findOne({ userId, courseId });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const getInstructorStats = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Fetching stats for instructor:', userId);
        const instructorCourses = await Course.find({ instructor: userId });
        const courseIds = instructorCourses.map(c => c._id);
        console.log('Courses found:', courseIds.length);
        const enrollments = await Enrollment.find({ courseId: { $in: courseIds } }).populate('courseId');
        console.log('Enrollments found:', enrollments.length);
        const totalStudents = enrollments.length;
        const totalRevenue = enrollments.reduce((sum, enrollment) => {
            return sum + (enrollment.courseId.price || 0);
        }, 0);
        res.status(200).json({ totalStudents, totalRevenue });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { enrollInCourse, getMyEnrollments, updateProgress, getCertificate, getEnrollmentStatus, getInstructorStats };
