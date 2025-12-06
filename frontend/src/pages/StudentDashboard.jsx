import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchEnrollments();
    }, []);
    const fetchEnrollments = async () => {
        try {
            const { data } = await api.get('/enroll/my-courses');
            setEnrollments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {}
            <div className="blob" style={{ top: '10%', left: '-10%', width: '500px', height: '500px', background: '#3b82f6', opacity: 0.2 }}></div>
            <div className="blob" style={{ bottom: '20%', right: '-5%', width: '600px', height: '600px', background: '#8b5cf6', animationDelay: '4s', opacity: 0.2 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <div className="reveal-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Dashboard</div>
                        <h2 className="reveal-text delay-1" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', margin: 0 }}>My Learning</h2>
                    </div>
                </div>
                {loading ? (
                    <div style={{ color: 'var(--text-muted)', padding: '4rem', textAlign: 'center' }}>Loading your courses...</div>
                ) : (
                    <>
                        {enrollments.length === 0 ? (
                            <div className="bento-card reveal-text delay-2" style={{ textAlign: 'center', padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Start Your Journey</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '2rem', lineHeight: 1.6 }}>
                                    You haven't enrolled in any courses yet. Browse our catalog to find your next skill.
                                </p>
                                <Link to="/courses" className="btn btn-primary">Browse Catalog</Link>
                            </div>
                        ) : (
                            <div className="bento-grid">
                                {enrollments.map((enrollment, index) => (
                                    <div key={enrollment._id} className="bento-card col-span-4 reveal-text" style={{
                                        padding: '0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        animationDelay: `${index * 0.1}s`
                                    }}>
                                        <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                            {enrollment.courseId.thumbnail ? (
                                                <img
                                                    src={`http://localhost:5000${enrollment.courseId.thumbnail}`}
                                                    alt={enrollment.courseId.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>📚</div>
                                            )}
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.3, height: '3.2rem', overflow: 'hidden' }}>{enrollment.courseId.title}</h3>
                                            <div style={{ marginTop: 'auto' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                    <span>Progress</span>
                                                    <span>{Math.round(enrollment.progress)}%</span>
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '100px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                                    <div style={{ width: `${enrollment.progress}%`, background: 'var(--primary)', height: '100%', borderRadius: '100px', transition: 'width 1s ease-out' }}></div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                    <Link to={`/learn/${enrollment.courseId._id}`} className="btn btn-primary" style={{ flex: 1, padding: '0.7rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                                                        {enrollment.progress > 0 ? 'Continue' : 'Start'}
                                                    </Link>
                                                    {enrollment.isCompleted && (
                                                        <Link
                                                            to={`/certificate/${enrollment.courseId._id}`}
                                                            className="btn btn-glass"
                                                            style={{ padding: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                            title="View Certificate"
                                                        >
                                                            🏆
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default StudentDashboard;
