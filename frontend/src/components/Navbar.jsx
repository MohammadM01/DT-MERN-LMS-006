import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    return (
        <nav className="glass-header" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
        }}>
            <div className="container" style={{
                height: '80px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    LMS<span style={{ color: 'var(--primary)' }}>.PRO</span>
                </Link>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link to="/courses" style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        transition: 'color 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                    >
                        Courses
                    </Link>
                    {user ? (
                        <>
                            {user.role === 'student' && (
                                <Link to="/dashboard" style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = 'white'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                                >
                                    My Learning
                                </Link>
                            )}
                            {user.role === 'instructor' && (
                                <Link to="/instructor-dashboard" style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = 'white'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                                >
                                    Instructor Panel
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border)',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontWeight: 500
                                }}
                                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.95rem'
                            }}>
                                Log In
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
