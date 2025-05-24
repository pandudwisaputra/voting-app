// File utama aplikasi yang menangani routing dan autentikasi
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import VotePage from './pages/vote/VotePage';
import VoteCreatePage from './pages/vote/VoteCreatePage';
import UserPage from './pages/user/UserPage';
import UserCreatePage from './pages/user/UserCreatePage';
import UserEditPage from './pages/user/UserEditPage';
import CandidatePage from './pages/candidate/CandidatePage';
import CandidateCreatePage from './pages/candidate/CandidateCreatePage';
import CandidateEditPage from './pages/candidate/CandidateEditPage';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // Router utama aplikasi
    <Router>
      {/* Provider untuk konteks autentikasi */}
      <AuthProvider>
        <Routes>
          {/* Rute publik yang bisa diakses tanpa login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rute yang dilindungi untuk pengguna yang sudah login (voter) */}
          <Route element={<RequireAuth />}>
            <Route path="/vote/create" element={<VoteCreatePage />} />
          </Route>

          {/* Rute yang dilindungi khusus untuk admin */}
          <Route element={<RequireAdmin />}>
            {/* Halaman dashboard untuk melihat statistik */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Halaman manajemen pengguna */}
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/create" element={<UserCreatePage />} />
            <Route path="/user/edit/:id" element={<UserEditPage />} />
            
            {/* Halaman manajemen voting */}
            <Route path="/vote" element={<VotePage />} />
            
            {/* Halaman manajemen kandidat */}
            <Route path="/candidate" element={<CandidatePage />} />
            <Route path="/candidate/create" element={<CandidateCreatePage />} />
            <Route path="/candidate/edit/:id" element={<CandidateEditPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
