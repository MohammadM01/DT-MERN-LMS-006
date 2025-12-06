import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
const CertificatePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                const { data } = await api.get(`/enroll/status/${courseId}`);
                const courseData = await api.get(`/courses/${courseId}`);
                setEnrollment({ ...data, courseTitle: courseData.data.title });
            } catch (error) {
                console.error("Failed to load certificate data", error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchCertificateData();
    }, [courseId, user, navigate]);
    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'var(--text-muted)' }}>
            Generating Certificate...
        </div>
    );
    if (!enrollment || !enrollment.isCompleted) return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'white' }}>
            <h2>Certificate Not Available</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You haven't completed this course yet.</p>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Return to Dashboard</button>
        </div>
    );
    return (
        <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {/* Ambient Celebration Background */}
            <div className="blob" style={{ top: '20%', left: '25%', width: '500px', height: '500px', background: '#fbbf24', opacity: 0.15 }}></div>
            <div className="blob" style={{ bottom: '20%', right: '25%', width: '600px', height: '600px', background: '#d97706', animationDelay: '2s', opacity: 0.15 }}></div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
                <h1 className="reveal-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Congratulations!
                </h1>
                <p className="reveal-text delay-1" style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                    You've officially mastered this skill.
                </p>
                {}
                <div className="certificate-card reveal-text delay-2" style={{
                    width: '100%',
                    aspectRatio: '1.414/1', 
                    background: 'rgba(20, 20, 25, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '20px',
                    padding: '4rem',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(251, 191, 36, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    {}
                    <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #fbbf24', borderLeft: '2px solid #fbbf24' }}></div>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderTop: '2px solid #fbbf24', borderRight: '2px solid #fbbf24' }}></div>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '40px', height: '40px', borderBottom: '2px solid #fbbf24', borderLeft: '2px solid #fbbf24' }}></div>
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #fbbf24', borderRight: '2px solid #fbbf24' }}></div>
                    {}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '1rem', letterSpacing: '0.2rem', textTransform: 'uppercase', color: '#fbbf24', marginBottom: '0.5rem' }}>Certificate of Completion</div>
                        <div style={{ width: '60px', height: '2px', background: '#fbbf24', margin: '0 auto' }}></div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 400, marginBottom: '1rem' }}>This certifies that</h2>
                    <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'white' }}>
                        {user.name}
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>has successfully completed the course</p>
                    <h3 style={{ fontSize: '2rem', color: '#fbbf24', marginBottom: '2rem' }}>
                        {enrollment.courseTitle || 'Course Title'}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontFamily: 'Thinking of Betty', fontSize: '1.5rem', color: 'white' }}>LMS Pro Team</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Instructor</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.2rem', color: 'white' }}>{new Date(enrollment.completionDate || Date.now()).toLocaleDateString()}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Issued</div>
                        </div>
                    </div>
                </div>
                {}
                <div className="reveal-text delay-3" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                    <a
                        href={`http://localhost:5000/api/enroll/certificate/${courseId}`}
                        download
                        className="btn btn-primary"
                        style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', background: 'linear-gradient(to right, #fbbf24, #d97706)', border: 'none', color: 'black', fontWeight: 600 }}
                    >
                        ⬇️ Download Official PDF
                    </a>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-glass"
                        style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CertificatePage;
