const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');
const createQuiz = async (req, res) => {
    try {
        const { courseId, question, options, correctAnswer } = req.body;
        const newQuiz = new Quiz({
            courseId,
            question,
            options,
            correctAnswer
        });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ courseId: req.params.courseId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const attemptQuiz = async (req, res) => {
    try {
        const { courseId, answers } = req.body;
        const userId = req.user.id;
        const quizzes = await Quiz.find({ courseId });
        let score = 0;
        quizzes.forEach(quiz => {
            if (answers[quiz._id] === quiz.correctAnswer) {
                score++;
            }
        });
        const percentage = (score / quizzes.length) * 100;
        const passed = percentage >= 70;
        res.status(200).json({ score, total: quizzes.length, percentage, passed });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { createQuiz, getQuizzesByCourse, attemptQuiz };
