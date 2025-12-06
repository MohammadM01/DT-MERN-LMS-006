import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    const handleEnroll = async (courseId) => {
        if (!user) return navigate('/login');
        try {
            await api.post('/enroll', { courseId });
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Enrollment failed');
        }
    };
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {}
            <div className="blob" style={{ top: '15%', left: '-5%', width: '500px', height: '500px', background: '#14b8a6', opacity: 0.2 }}></div>
            <div className="blob" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', background: '#0ea5e9', animationDelay: '3s', opacity: 0.2 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div className="reveal-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Catalog</div>
                    <h2 className="reveal-text delay-1" style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', margin: 0 }}>Explore Knowledge</h2>
                    <p className="reveal-text delay-2" style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
                        Curated learning paths designed to take you from beginner to expert.
                    </p>
                </div>
                {loading ? (
                    <div style={{ color: 'var(--text-muted)', padding: '4rem', textAlign: 'center' }}>Loading courses...</div>
                ) : (
                    <div className="bento-grid">
                        {courses.map((course, index) => (
                            <div key={course._id} className="bento-card col-span-4 reveal-text" style={{
                                padding: '0',
                                display: 'flex',
                                flexDirection: 'column',
                                animationDelay: `${index * 0.1}s`
                            }}>
                                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                    {course.thumbnail ? (
                                        <img
                                            src={`http://localhost:5000${course.thumbnail}`}
                                            alt={course.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
                                    )}
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.35rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {course.category || 'General'}
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{course.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
                                        {course.description.substring(0, 100)}...
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>
                                            {course.price === 0 ? 'Free' : `$${course.price}`}
                                        </span>
                                        <button
                                            onClick={() => handleEnroll(course._id)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default CourseCatalog;
