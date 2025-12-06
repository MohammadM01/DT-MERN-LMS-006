import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseCatalog from './pages/CourseCatalog';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import ManageCourse from './pages/ManageCourse';
import LearningPlayer from './pages/LearningPlayer';
import CertificatePage from './pages/CertificatePage';
import AdminDashboard from './pages/AdminDashboard';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseCatalog />} />

        <Route path="/dashboard" element={
          <PrivateRoute roles={['student']}>
            <StudentDashboard />
          </PrivateRoute>
        } />

        <Route path="/instructor-dashboard" element={
          <PrivateRoute roles={['instructor']}>
            <InstructorDashboard />
          </PrivateRoute>
        } />

        <Route path="/course/:id/manage" element={
          <PrivateRoute roles={['instructor']}>
            <ManageCourse />
          </PrivateRoute>
        } />

        <Route path="/learn/:courseId" element={
          <PrivateRoute roles={['student']}>
            <LearningPlayer />
          </PrivateRoute>
        } />

        <Route path="/certificate/:courseId" element={
          <PrivateRoute roles={['student']}>
            <CertificatePage />
          </PrivateRoute>
        } />

        <Route path="/admin-dashboard" element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
