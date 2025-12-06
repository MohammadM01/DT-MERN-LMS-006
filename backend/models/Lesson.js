const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: '',
    }
}, { timestamps: true });
const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
