import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
const ManageCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [newLesson, setNewLesson] = useState({ title: '', description: '', order: 1 });
    const [editingLessonId, setEditingLessonId] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [newQuiz, setNewQuiz] = useState({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    useEffect(() => {
        fetchCourse();
    }, [id]);
    const fetchCourse = async () => {
        try {
            const { data } = await api.get(`/courses/${id}`);
            setCourse(data);
            setNewLesson(prev => ({ ...prev, order: data.lessons.length + 1 }));
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newLesson.title);
            formData.append('description', newLesson.description);
            formData.append('order', newLesson.order);
            if (videoFile) formData.append('video', videoFile);
            if (pdfFile) formData.append('pdf', pdfFile);
            if (editingLessonId) {
                await api.put(`/courses/lesson/${editingLessonId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                setEditingLessonId(null);
            } else {
                formData.append('courseId', id);
                await api.post('/courses/lesson', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            setNewLesson({ title: '', description: '', order: course.lessons.length + 1 });
            setVideoFile(null);
            setPdfFile(null);
            fetchCourse();
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddQuiz = async (e) => {
        e.preventDefault();
        try {
            await api.post('/quizzes', { ...newQuiz, courseId: id });
            alert('Quiz added');
            setNewQuiz({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteLesson = async (lessonId) => {
        if (!window.confirm('Are you sure you want to delete this lesson?')) return;
        try {
            await api.delete(`/courses/lesson/${lessonId}`);
            fetchCourse();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditLesson = (lesson) => {
        setEditingLessonId(lesson._id);
        setNewLesson({
            title: lesson.title,
            description: lesson.description || '',
            order: lesson.order
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };
    if (!course) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Loading course data...
        </div>
    );
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {}
            <div className="blob" style={{ top: '10%', right: '10%', width: '400px', height: '400px', background: '#ec4899', opacity: 0.2 }}></div>
            <div className="blob" style={{ bottom: '20%', left: '10%', width: '600px', height: '600px', background: '#8b5cf6', animationDelay: '3s', opacity: 0.2 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {}
                <button
                    onClick={() => navigate('/instructor-dashboard')}
                    className="btn btn-glass"
                    style={{ marginBottom: '2rem', padding: '0.4rem 0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                >
                    <span>←</span> Back
                </button>
                <div style={{ marginBottom: '3rem' }}>
                    <div className="reveal-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Course Management</div>
                    <h2 className="reveal-text delay-1" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', margin: 0 }}>{course.title}</h2>
                </div>
                <div className="bento-grid">
                    {}
                    <div className="bento-card col-span-12 reveal-text delay-2" style={{ padding: '2.5rem', overflow: 'visible' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.25em' }}>{editingLessonId ? '✏️' : '📹'}</span> {editingLessonId ? 'Edit Lesson Content' : 'Add New Lesson'}
                            </h3>
                            {editingLessonId && (
                                <button
                                    onClick={() => {
                                        setEditingLessonId(null);
                                        setNewLesson({ title: '', description: '', order: course.lessons.length + 1 });
                                    }}
                                    className="btn btn-outline"
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                        <form onSubmit={handleAddLesson} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Lesson Title</label>
                                    <input className="glass-input" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} required placeholder="e.g. Introduction to React State" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea className="glass-input" rows="4" value={newLesson.description} onChange={e => setNewLesson({ ...newLesson, description: e.target.value })} placeholder="Brief summary of this lesson..." style={{ resize: 'none' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', height: 'fit-content' }}>
                                <div className="form-group">
                                    <label className="form-label">{editingLessonId ? 'Replace Video (Optional)' : 'Video File (MP4)'}</label>
                                    <input type="file" className="glass-input" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required={!editingLessonId} style={{ padding: '0.5rem' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{editingLessonId ? 'Replace Resources (Optional)' : 'Resource File (PDF/Docs)'}</label>
                                    <input type="file" className="glass-input" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => setPdfFile(e.target.files[0])} style={{ padding: '0.5rem' }} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                                    {editingLessonId ? 'Update Lesson' : '+ Add Lesson'}
                                </button>
                            </div>
                        </form>
                    </div>
                    {}
                    <div className="bento-card col-span-8 reveal-text delay-3" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Course Structure</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{course.lessons.length} Lessons Uploaded</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            {course.lessons.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {course.lessons.map((lesson, index) => (
                                        <div key={lesson._id} style={{
                                            padding: '1rem',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'background 0.2s'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    width: '28px', height: '28px',
                                                    borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.8rem', color: 'var(--text-muted)'
                                                }}>{index + 1}</span>
                                                <span style={{ fontWeight: 500 }}>{lesson.title}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                                                {lesson.videoUrl && <span>📹 Video</span>}
                                                {lesson.pdfUrl && <span>📄 PDF</span>}
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson._id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '1rem' }}
                                                    title="Delete Lesson"
                                                >
                                                    🗑️
                                                </button>
                                                <button
                                                    onClick={() => handleEditLesson(lesson)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1rem' }}
                                                    title="Edit Lesson"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    No lessons added yet. Use the form above to get started.
                                </div>
                            )}
                        </div>
                    </div>
                    {}
                    <div className="bento-card col-span-4 reveal-text delay-3" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>⚡</span> Quick Quiz Builder
                        </h3>
                        <form onSubmit={handleAddQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Question</label>
                                <input className="glass-input" value={newQuiz.question} onChange={e => setNewQuiz({ ...newQuiz, question: e.target.value })} required placeholder="Enter question..." />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {newQuiz.options.map((opt, i) => (
                                    <div key={i}><input className="glass-input" placeholder={`Opt ${i + 1}`} value={opt} onChange={e => {
                                        const newOpts = [...newQuiz.options];
                                        newOpts[i] = e.target.value;
                                        setNewQuiz({ ...newQuiz, options: newOpts });
                                    }} required style={{ fontSize: '0.85rem', padding: '0.6rem' }} /></div>
                                ))}
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Correct Option (0-3)</label>
                                <input type="number" min="0" max="3" className="glass-input" value={newQuiz.correctAnswer} onChange={e => setNewQuiz({ ...newQuiz, correctAnswer: parseInt(e.target.value) })} required />
                            </div>
                            <button type="submit" className="btn btn-glass" style={{ width: '100%', marginTop: '0.5rem' }}>Add to Course Quiz</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ManageCourse;
