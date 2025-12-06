import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../utils/api';
const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalInstructors: 0, totalCourses: 0, totalRevenue: 0 });
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchAdminData();
    }, []);
    const fetchAdminData = async () => {
        try {
            const statsData = await api.get('/admin/stats');
            setStats(statsData.data);
            const usersData = await api.get('/admin/users');
            setUsers(usersData.data);
            const coursesData = await api.get('/courses');
            setCourses(coursesData.data);
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };
    const handlePromote = async (userId) => {
        if (!window.confirm('Promote this user to Instructor?')) return;
        try {
            await api.put(`/admin/users/${userId}/role`, { role: 'instructor' });
            fetchAdminData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDemote = async (userId) => {
        if (!window.confirm('Demote this Instructor back to Student?')) return;
        try {
            await api.put(`/admin/users/${userId}/role`, { role: 'student' });
            fetchAdminData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Permanently delete this user?')) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            fetchAdminData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm('Permanently delete this course?')) return;
        try {
            await api.delete(`/courses/${courseId}`);
            fetchAdminData();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {}
            <div className="blob" style={{ top: '10%', left: '40%', width: '500px', height: '500px', background: '#d97706', opacity: 0.15 }}></div>
            <div className="blob" style={{ bottom: '10%', right: '10%', width: '400px', height: '400px', background: '#fbbf24', animationDelay: '3s', opacity: 0.15 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div className="reveal-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>System Control</div>
                    <h2 className="reveal-text delay-1" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', margin: 0 }}>Admin Dashboard</h2>
                </div>
                {error && (
                    <div className="bento-card" style={{ marginBottom: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                        Error: {error}
                    </div>
                )}
                {}
                <div className="bento-grid" style={{ marginBottom: '2rem' }}>
                    <div className="bento-card col-span-3 reveal-text delay-2" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{stats.totalUsers}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Students</div>
                    </div>
                    <div className="bento-card col-span-3 reveal-text delay-2" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{stats.totalInstructors}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Instructors</div>
                    </div>
                    <div className="bento-card col-span-3 reveal-text delay-2" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{stats.totalCourses}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Courses</div>
                    </div>
                    <div className="bento-card col-span-3 reveal-text delay-2" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>${stats.totalRevenue.toLocaleString()}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Revenue</div>
                    </div>
                </div>
                {}
                <div className="bento-grid" style={{ marginBottom: '2rem' }}>
                    {}
                    <div className="bento-card col-span-7 reveal-text delay-3" style={{ padding: '2rem', height: '400px' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Platform Growth</h3>
                        {stats.enrollmentTrend && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.enrollmentTrend}>
                                    <defs>
                                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="#52525b" />
                                    <YAxis stroke="#52525b" />
                                    <Tooltip
                                        contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fbbf24' }}
                                    />
                                    <Area type="monotone" dataKey="students" stroke="#fbbf24" fillOpacity={1} fill="url(#colorStudents)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                        {!stats.enrollmentTrend?.length && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No Data Yet</div>}
                    </div>
                    {}
                    <div className="bento-card col-span-5 reveal-text delay-3" style={{ padding: '2rem', height: '400px' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Top Performing Courses</h3>
                        {stats.topCourses && stats.topCourses.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.topCourses} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis type="number" stroke="#52525b" hide />
                                    <YAxis dataKey="name" type="category" stroke="#52525b" width={100} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="students" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                        {
                                            stats.topCourses.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#a855f7'} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No Data Yet</div>
                        )}
                    </div>
                </div>
                {}
                <div className="bento-card reveal-text delay-3 col-span-12" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>User Management</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <th style={{ padding: '1rem' }}>User</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem' }}>Joined</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {u.name.charAt(0)}
                                            </div>
                                            {u.name}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '100px',
                                                fontSize: '0.75rem',
                                                background: u.role === 'admin' ? 'rgba(251, 191, 36, 0.2)' : u.role === 'instructor' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.05)',
                                                color: u.role === 'admin' ? '#fbbf24' : u.role === 'instructor' ? '#a855f7' : 'var(--text-muted)'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                {u.role === 'student' && (
                                                    <button
                                                        onClick={() => handlePromote(u._id)}
                                                        className="btn"
                                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)' }}
                                                    >
                                                        Promote
                                                    </button>
                                                )}
                                                {u.role === 'instructor' && (
                                                    <button
                                                        onClick={() => handleDemote(u._id)}
                                                        className="btn"
                                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)' }}
                                                    >
                                                        Demote
                                                    </button>
                                                )}
                                                {u.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDeleteUser(u._id)}
                                                        className="btn"
                                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {}
                <div className="bento-card reveal-text delay-3 col-span-12" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Course Management</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <th style={{ padding: '1rem' }}>Course</th>
                                    <th style={{ padding: '1rem' }}>Instructor</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((c) => (
                                    <tr key={c._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{c.title}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{c.instructor?.name || 'Unknown'}</td>
                                        <td style={{ padding: '1rem' }}>${c.price}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDeleteCourse(c._id)}
                                                className="btn"
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
