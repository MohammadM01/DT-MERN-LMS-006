import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const Home = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        const hiddenElements = document.querySelectorAll('.scroll-reveal');
        hiddenElements.forEach((el) => observer.observe(el));
        return () => hiddenElements.forEach((el) => observer.unobserve(el));
    }, []);
    return (
        <div style={{ position: 'relative', overflowX: 'hidden' }}>
            { }
            <div className="blob" style={{ top: '-10%', left: '-10%', width: '600px', height: '600px', background: '#4c1d95' }}></div>
            <div className="blob" style={{ bottom: '10%', right: '-5%', width: '500px', height: '500px', background: '#be185d', animationDelay: '2s' }}></div>
            { }
            <section style={{ minHeight: '90vh', paddingTop: '8rem', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <div style={{ maxWidth: '900px', marginBottom: '4rem' }}>
                        <div className="scroll-reveal" style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '100px',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            background: 'rgba(255,255,255,0.03)'
                        }}>
                            ✨ The New Standard in Learning
                        </div>
                        <h1 className="display-text scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            Education that feels <br />
                            <i style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>natural</i> and <span className="text-gradient">limitless.</span>
                        </h1>
                        <p className="scroll-reveal" style={{ transitionDelay: '0.2s', fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem' }}>
                            Forget clunky interfaces. We've built a learning experience that flows as fast as you think. Beautiful, intuitive, and designed for humans.
                        </p>
                        <div className="scroll-reveal" style={{ transitionDelay: '0.3s', display: 'flex', gap: '1rem' }}>
                            <Link to="/register" className="btn btn-primary">Start Learning Free</Link>
                            <Link to="/courses" className="btn btn-glass">Browse Catalog</Link>
                        </div>
                    </div>
                    {/* Bento Grid Features */}
                    <div className="bento-grid">
                        {/* Main Feature - Video */}
                        <div className="bento-card col-span-8 row-span-2 scroll-reveal" style={{
                            minHeight: '500px', display: 'flex', alignItems: 'end', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ position: 'relative', zIndex: 10 }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Immersive Learning</h3>
                                <p style={{ color: '#d4d4d8' }}>Cinema-quality video playback with interactive notes.</p>
                            </div>
                        </div>
                        { }
                        <div className="bento-card col-span-4 scroll-reveal" style={{ transitionDelay: '0.1s', background: '#27272a', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>98%</div>
                            <p style={{ color: 'var(--text-muted)' }}>Completion Rate</p>
                        </div>
                        { }
                        <div className="bento-card col-span-4 scroll-reveal" style={{ transitionDelay: '0.2s', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.1, fontSize: '4rem' }}>⚡</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant Feedback</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Quizzes that grade themselves in real-time, giving you immediate insights.</p>
                        </div>
                        { }
                        <div className="bento-card col-span-6 scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Global Community</h3>
                            <div style={{ display: 'flex', marginTop: '1rem' }}>
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '50%',
                                        background: `url(https://randomuser.me/api/portraits/men/${i + 20}.jpg) center/cover`,
                                        border: '2px solid var(--bg-card)',
                                        marginLeft: i > 1 ? '-10px' : 0
                                    }}></div>
                                ))}
                                <div style={{
                                    width: '40px', height: '40px',
                                    borderRadius: '50%',
                                    background: '#3f3f46',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    marginLeft: '-10px',
                                    border: '2px solid var(--bg-card)'
                                }}>+2k</div>
                            </div>
                        </div>
                        { }
                        <div className="bento-card col-span-6 scroll-reveal" style={{ transitionDelay: '0.2s', background: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Certified</h3>
                                <p style={{ color: '#e0e7ff', opacity: 0.8 }}>Earn industry-ready credentials.</p>
                            </div>
                            <div style={{ fontSize: '3rem' }}>🎖️</div>
                        </div>
                    </div>
                </div >
            </section >
            { }
            < section style={{ padding: '8rem 0', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="scroll-reveal" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text-main)' }}>Loved by <i style={{ color: '#fdba74' }}>Students & Teachers</i></div>
                    <p className="scroll-reveal" style={{ transitionDelay: '0.1s', color: 'var(--text-muted)' }}>Join 15,000+ creators, developers, and thinkers.</p>
                </div>
                <div className="marquee-container scroll-reveal" style={{
                    transitionDelay: '0.2s',
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
                    onMouseEnter={(e) => { const el = e.currentTarget.querySelector('.marquee-content'); if (el) el.style.animationPlayState = 'paused'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget.querySelector('.marquee-content'); if (el) el.style.animationPlayState = 'running'; }}
                >
                    <div className="marquee-content" style={{ display: 'flex', gap: '2rem', padding: '1rem 0' }}>
                        {[
                            { name: 'Sarah J.', role: 'UX Designer', text: 'This platform actually understands how creatives learn. No fluff, just skills.', img: '32' },
                            { name: 'David K.', role: 'Frontend Dev', text: 'The dark mode is a lifesaver for my eyes. The React course is world-class.', img: '11' },
                            { name: 'Elena R.', role: 'Product Manager', text: 'Finally, a certification that employers actually respect. Worth every penny.', img: '5' },
                            { name: 'Marcus T.', role: 'Founder', text: 'I trained my entire team here. The velocity of our shipping increased by 2x.', img: '68' },
                            { name: 'Priya M.', role: 'Data Scientist', text: 'The interactive quizzes helps concepts stick. It feels like 1-on-1 coaching.', img: '44' }
                        ].map((user, i) => (
                            <div key={i} className="bento-card" style={{
                                minWidth: '400px',
                                maxWidth: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                padding: '2rem',
                                whiteSpace: 'normal'
                            }}>
                                <div style={{ display: 'flex', gap: '0.5rem', color: '#fbbf24' }}>★★★★★</div>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#f4f4f5', fontStyle: 'italic' }}>"{user.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                                    <img src={`https://randomuser.me/api/portraits/thumb/women/${user.img}.jpg`} style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', width: '48px', height: '48px' }} alt={user.name} />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Student</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        { }
                        {[
                            { name: 'Sarah J.', role: 'UX Designer', text: 'This platform actually understands how creatives learn. No fluff, just skills.', img: '32' },
                            { name: 'David K.', role: 'Frontend Dev', text: 'The dark mode is a lifesaver for my eyes. The React course is world-class.', img: '11' }
                        ].map((user, i) => (
                            <div key={`dup-${i}`} className="bento-card" style={{
                                minWidth: '400px',
                                maxWidth: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                padding: '2rem',
                                whiteSpace: 'normal'
                            }}>
                                <div style={{ display: 'flex', gap: '0.5rem', color: '#fbbf24' }}>★★★★★</div>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#f4f4f5', fontStyle: 'italic' }}>"{user.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                                    <img src={`https://randomuser.me/api/portraits/thumb/women/${user.img}.jpg`} style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', width: '48px', height: '48px' }} alt={user.name} />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Student</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
            { }
            < footer style={{ background: '#050505', padding: '6rem 0 2rem', borderTop: '1px solid #27272a' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
                        <div className="scroll-reveal">
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>LMS.PRO</div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                                We build digital academies for the next generation of pioneers.
                                Crafted with obsession for quality and detail.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>𝕏</div>
                                <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>In</div>
                                <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Ig</div>
                            </div>
                        </div>
                        <div className="scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Explore</h4>
                            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><Link to="/courses">All Courses</Link></li>
                                <li><Link to="/roadmap">Learning Paths</Link></li>
                                <li><Link to="/instructors">Mentors</Link></li>
                                <li><Link to="/pricing">Pricing</Link></li>
                            </ul>
                        </div>
                        <div className="scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Company</h4>
                            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li><Link to="/about">Our Story</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/blog">Journal</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="scroll-reveal" style={{ transitionDelay: '0.3s' }}>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 600 }}>Join the Newsletter</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Get freshly brewed tips every Sunday.</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input placeholder="you@domain.com" style={{
                                    background: '#18181b',
                                    border: '1px solid #3f3f46',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    color: 'white',
                                    width: '100%',
                                    outline: 'none'
                                }} />
                                <button style={{ background: 'white', border: 'none', borderRadius: '8px', padding: '0 1rem', cursor: 'pointer' }}>→</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #27272a', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '0.9rem' }}>
                        <div>© 2025 LMS Pro Inc.</div>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Sitemap</span>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
};
export default Home;
