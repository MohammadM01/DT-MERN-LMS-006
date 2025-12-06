const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'student' });
        const totalInstructors = await User.countDocuments({ role: 'instructor' });
        const totalCourses = await Course.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments();
        const enrollments = await Enrollment.find().populate('courseId');
        let totalRevenue = 0;
        const courseStats = {};
        const monthlyStats = {};
        enrollments.forEach(enrollment => {
            if (!enrollment.courseId) return;
            totalRevenue += (enrollment.courseId.price || 0);
            const courseTitle = enrollment.courseId.title;
            courseStats[courseTitle] = (courseStats[courseTitle] || 0) + 1;
            const created = new Date(enrollment.createdAt);
            const month = created.toLocaleString('default', { month: 'short' });
            monthlyStats[month] = (monthlyStats[month] || 0) + 1;
        });
        console.log('Admin Stats Calculated:', { totalUsers, totalRevenue, topCourses: Object.keys(courseStats).length });
        const topCourses = Object.keys(courseStats)
            .map(title => ({ name: title, students: courseStats[title] }))
            .sort((a, b) => b.students - a.students)
            .slice(0, 5); 
        const enrollmentTrend = Object.keys(monthlyStats)
            .map(month => ({ name: month, students: monthlyStats[month] }));
        res.status(200).json({
            totalUsers,
            totalInstructors,
            totalCourses,
            totalEnrollments,
            totalRevenue,
            topCourses,
            enrollmentTrend
        });
    } catch (error) {
        console.error('Admin Stats Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { getAdminStats, getAllUsers, updateUserRole, deleteUser };
