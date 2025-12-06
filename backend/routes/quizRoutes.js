const express = require('express');
const { createQuiz, getQuizzesByCourse, attemptQuiz } = require('../controllers/quizController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', verifyToken, authorizeRoles('instructor', 'admin'), createQuiz);
router.get('/:courseId', verifyToken, getQuizzesByCourse);
router.post('/attempt', verifyToken, attemptQuiz);
module.exports = router;
