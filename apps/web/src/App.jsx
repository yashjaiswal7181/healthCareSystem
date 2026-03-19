import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/AuthContext';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import CliniciansPage from './pages/CliniciansPage';
import PatientsPage from './pages/PatientsPage';
import VisitsPage from './pages/VisitsPage';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/visits" replace /> : <LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/visits" replace />} />
        <Route path="clinicians" element={<CliniciansPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="visits" element={<VisitsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
