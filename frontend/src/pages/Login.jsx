import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'instructor') navigate('/instructor-dashboard');
            else if (user.role === 'admin') navigate('/admin-dashboard');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    return (
        <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {}
            <div className="blob" style={{ top: '20%', left: '20%', width: '400px', height: '400px', background: '#4c1d95', opacity: 0.3 }}></div>
            <div className="blob" style={{ bottom: '20%', right: '20%', width: '300px', height: '300px', background: '#be185d', animationDelay: '2s', opacity: 0.3 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
                <div className="reveal-text">
                    <div className="bento-card" style={{ padding: '3rem 2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Welcome Back</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Continue your journey</p>
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
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                                Sign In
                            </button>
                        </form>
                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            New here? <Link to="/register" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
