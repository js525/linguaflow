import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseCenter from './pages/CourseCenter';
import CourseDetail from './pages/CourseDetail';
import Vocabulary from './pages/Vocabulary';
import Grammar from './pages/Grammar';
import Speaking from './pages/Speaking';
import Listening from './pages/Listening';
import Community from './pages/Community';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import { useAuthStore } from './store';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <CourseCenter />
          </ProtectedRoute>
        } />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/learn/vocabulary" element={
          <ProtectedRoute>
            <Vocabulary />
          </ProtectedRoute>
        } />
        <Route path="/learn/grammar" element={
          <ProtectedRoute>
            <Grammar />
          </ProtectedRoute>
        } />
        <Route path="/learn/speaking" element={
          <ProtectedRoute>
            <Speaking />
          </ProtectedRoute>
        } />
        <Route path="/learn/listening" element={
          <ProtectedRoute>
            <Listening />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/achievements" element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
