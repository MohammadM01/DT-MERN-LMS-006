import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({ totalStudents: 0, totalRevenue: 0 });
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', price: 0, category: 'General', difficulty: 'Beginner' });
    const [file, setFile] = useState(null);
    useEffect(() => {
        fetchMyCourses();
        fetchStats();
    }, []);
    const fetchMyCourses = async () => {
        try {
            const { data } = await api.get('/courses/my-courses');
            setCourses(data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchStats = async () => {
        try {
            const { data } = await api.get('/enroll/instructor-stats');
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newCourse).forEach(key => formData.append(key, newCourse[key]));
        if (file) formData.append('thumbnail', file);
        try {
            await api.post('/courses', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setShowModal(false);
            fetchMyCourses();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
            {}
            <div className="blob" style={{ top: '10%', left: '20%', width: '500px', height: '500px', background: '#ec4899', opacity: 0.2 }}></div>
            <div className="blob" style={{ bottom: '10%', right: '20%', width: '400px', height: '400px', background: '#8b5cf6', animationDelay: '2s', opacity: 0.2 }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <div className="reveal-text" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Workspace</div>
                        <h2 className="reveal-text delay-1" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', margin: 0 }}>Instructor Panel</h2>
                    </div>
                    <button className="btn btn-primary reveal-text delay-2" onClick={() => setShowModal(true)}>+ Create Course</button>
                </div>
                <div className="bento-grid">
                    {}
                    <div className="bento-card col-span-12 reveal-text delay-3" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{courses.length}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Courses</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{stats.totalStudents}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Students</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>${stats.totalRevenue.toLocaleString()}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Revenue</div>
                        </div>
                    </div>
                    {courses.map((course, index) => (
                        <div key={course._id} className="bento-card col-span-4 reveal-text" style={{
                            padding: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            animationDelay: `${(index + 3) * 0.1}s`
                        }}>
                            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                {course.thumbnail ? (
                                    <img
                                        src={`http://localhost:5000${course.thumbnail}`}
                                        alt=""
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📝</div>
                                )}
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem' }}>
                                    {course.difficulty}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{course.category}</p>
                                <div style={{ marginTop: 'auto' }}>
                                    <Link to={`/course/${course._id}/manage`} className="btn btn-glass" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>Manage Content</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <div className="bento-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '550px', border: '1px solid var(--border)' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Create New Course</h3>
                            <form onSubmit={handleCreateCourse}>
                                <div className="form-group">
                                    <label className="form-label">Course Title</label>
                                    <input className="glass-input" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required placeholder="e.g. Advanced React Patterns" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea className="glass-input" rows="3" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required placeholder="What will students learn?" style={{ resize: 'none' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Price ($)</label>
                                        <input type="number" className="glass-input" value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select className="glass-input" value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}>
                                            <option value="General">General</option>
                                            <option value="Development">Development</option>
                                            <option value="Design">Design</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Thumbnail</label>
                                    <input type="file" className="glass-input" onChange={e => setFile(e.target.files[0])} style={{ padding: '0.5rem' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                    <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Create Course</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default InstructorDashboard;
