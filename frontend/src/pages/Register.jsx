import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };
    return (
        <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
            {}
            <div className="blob" style={{ top: '10%', right: '20%', width: '500px', height: '500px', background: '#4c1d95', opacity: 0.3 }}></div>
            <div className="blob" style={{ bottom: '10%', left: '20%', width: '400px', height: '400px', background: '#be185d', animationDelay: '2s', opacity: 0.3 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>
                <div className="reveal-text">
                    <div className="bento-card" style={{ padding: '3rem 2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Join the Future</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Start your learning journey today</p>
                        </div>
                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#fca5a5',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="glass-input"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="glass-input"
                                    placeholder="you@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="glass-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">I want to be a</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setRole('student')}
                                        style={{
                                            padding: '0.8rem',
                                            borderRadius: '12px',
                                            border: role === 'student' ? '1px solid var(--primary)' : '1px solid var(--border)',
                                            background: role === 'student' ? 'rgba(196, 181, 253, 0.1)' : 'rgba(255,255,255,0.03)',
                                            color: role === 'student' ? 'white' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontSize: '0.9rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        Student
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('instructor')}
                                        style={{
                                            padding: '0.8rem',
                                            borderRadius: '12px',
                                            border: role === 'instructor' ? '1px solid var(--primary)' : '1px solid var(--border)',
                                            background: role === 'instructor' ? 'rgba(196, 181, 253, 0.1)' : 'rgba(255,255,255,0.03)',
                                            color: role === 'instructor' ? 'white' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontSize: '0.9rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        Instructor
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                                Create Account
                            </button>
                        </form>
                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
