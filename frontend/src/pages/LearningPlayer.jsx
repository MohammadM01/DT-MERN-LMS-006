import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
const LearningPlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);
    const [viewingResource, setViewingResource] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData = await api.get(`/courses/${courseId}`);
                setCourse(courseData.data);
                if (courseData.data.lessons.length > 0) setActiveLesson(courseData.data.lessons[0]);
                const enrollData = await api.get(`/enroll/status/${courseId}`);
                setEnrollment(enrollData.data);
                const quizData = await api.get(`/quizzes/${courseId}`);
                setQuizzes(quizData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [courseId]);
    const markComplete = async (lessonId) => {
        try {
            const { data } = await api.put('/enroll/progress', { courseId, lessonId });
            setEnrollment(data);
        } catch (error) {
            console.error(error);
        }
    };
    const submitQuiz = async () => {
        try {
            const { data } = await api.post('/quizzes/attempt', { courseId, answers: quizAnswers });
            setQuizResult(data);
        } catch (error) {
            console.error(error);
        }
    };
    if (!course) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Loading Classroom...
        </div>
    );
    return (
        <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#09090b', paddingTop: '80px' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', overflow: 'hidden' }}>
                {}
                <div style={{ overflowY: 'auto', padding: '2rem', position: 'relative' }}>
                    {}
                    <div className="blob" style={{ top: '-10%', left: '10%', width: '600px', height: '600px', background: '#4c1d95', opacity: 0.15 }}></div>
                    {}
                    <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-glass"
                            style={{ padding: '0.4rem 0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                        >
                            <span>←</span> Back
                        </button>
                    </div>
                    {activeLesson ? (
                        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                            {}
                            <div style={{
                                aspectRatio: '16/9',
                                background: '#000',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                marginBottom: '2rem'
                            }}>
                                <video src={`http://localhost:5000${activeLesson.videoUrl}`} controls style={{ width: '100%', height: '100%' }} />
                            </div>
                            {}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '2rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{activeLesson.title}</h1>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{activeLesson.description}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
                                    {activeLesson.pdfUrl && (
                                        <button
                                            onClick={() => setViewingResource(`http://localhost:5000${activeLesson.pdfUrl}`)}
                                            className="btn btn-glass"
                                            title="View Resource"
                                        >
                                            📄 Resources
                                        </button>
                                    )}
                                    <button
                                        className={`btn ${enrollment?.completedLessons.includes(activeLesson._id) ? 'btn-outline' : 'btn-primary'}`}
                                        onClick={() => markComplete(activeLesson._id)}
                                        style={{ minWidth: '140px', justifyContent: 'center' }}
                                    >
                                        {enrollment?.completedLessons.includes(activeLesson._id) ? '✓ Completed' : 'Mark Complete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>Select a lesson to begin.</div>
                    )}
                </div>
                {}
                <div style={{
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(5, 5, 5, 0.8)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Course Content</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <span>Progress</span>
                                <span>{Math.round(enrollment?.progress || 0)}%</span>
                            </div>
                            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${enrollment?.progress || 0}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.5s' }}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {course.lessons.map((lesson, index) => {
                            const isActive = activeLesson?._id === lesson._id;
                            const isCompleted = enrollment?.completedLessons.includes(lesson._id);
                            return (
                                <div
                                    key={lesson._id}
                                    onClick={() => setActiveLesson(lesson)}
                                    style={{
                                        padding: '1rem 1.5rem',
                                        cursor: 'pointer',
                                        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                                        borderBottom: '1px solid rgba(255,255,255,0.02)',
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '24px', height: '24px',
                                        borderRadius: '50%',
                                        background: isCompleted ? 'var(--secondary)' : 'rgba(255,255,255,0.1)',
                                        color: isCompleted ? '#000' : 'var(--text-muted)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.75rem', fontWeight: 600,
                                        flexShrink: 0
                                    }}>
                                        {isCompleted ? '✓' : index + 1}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem', color: isActive ? 'white' : 'var(--text-muted)' }}>{lesson.title}</h4>
                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                                            {lesson.videoUrl && <span>Video</span>}
                                            {lesson.pdfUrl && <span>• PDF</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {quizzes.length > 0 && (
                        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowQuiz(true)}>
                                📝 Take Final Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {}
            {showQuiz && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' }}>
                    <div className="glass-panel" style={{ width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '3rem', background: '#18181b', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Final Assessment</h2>
                            <button onClick={() => setShowQuiz(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        {!quizResult ? (
                            <div>
                                {quizzes.map((q, index) => (
                                    <div key={q._id} style={{ marginBottom: '3rem' }}>
                                        <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: 600, marginRight: '0.5rem' }}>{index + 1}.</span>
                                            {q.question}
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            {q.options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    className={`glass-input`}
                                                    style={{
                                                        textAlign: 'left',
                                                        cursor: 'pointer',
                                                        background: quizAnswers[q._id] === i ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                        borderColor: quizAnswers[q._id] === i ? 'var(--primary)' : 'var(--border)',
                                                        color: quizAnswers[q._id] === i ? 'white' : 'var(--text-muted)',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onClick={() => setQuizAnswers({ ...quizAnswers, [q._id]: i })}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={submitQuiz} disabled={Object.keys(quizAnswers).length !== quizzes.length}>
                                    Submit Final Answers
                                </button>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{quizResult.passed ? '🎉' : '📚'}</div>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Score: {quizResult.percentage}%</h3>
                                <p style={{ fontSize: '1.25rem', color: quizResult.passed ? '#4ade80' : '#ef4444', marginBottom: '3rem' }}>
                                    {quizResult.passed ? 'Excellent work! You have passed this course.' : 'Keep learning and try again.'}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <button className="btn btn-outline" onClick={() => { setQuizResult(null); setShowQuiz(false); }}>Close Results</button>
                                    {quizResult.passed && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/certificate/${courseId}`)}
                                            style={{ background: 'linear-gradient(to right, #fbbf24, #d97706)', border: 'none', color: 'black', fontWeight: 600 }}
                                        >
                                            🎓 View Certificate
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {}
            {viewingResource && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
                    {}
                    <div style={{
                        padding: '1rem 2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#09090b'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>Lesson Resource</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href={viewingResource} download className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                ⬇️ Download
                            </a>
                            <button
                                onClick={() => setViewingResource(null)}
                                className="btn btn-glass"
                                style={{ padding: '0.5rem 1rem' }}
                            >
                                ✕ Close
                            </button>
                        </div>
                    </div>
                    {}
                    <div style={{ flex: 1, width: '100%', height: '100%', background: '#18181b' }}>
                        {}
                        <iframe
                            src={viewingResource.toLowerCase().endsWith('.pdf')
                                ? viewingResource
                                : `https://docs.google.com/viewer?url=${encodeURIComponent(viewingResource)}&embedded=true`
                            }
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="Resource Viewer"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
export default LearningPlayer;
