// Import dependencies yang diperlukan
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

// Komponen untuk menampilkan header dengan menu user dan tombol logout
function ComponentHeader() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return null;

  const handleLogout = async (e) => {
    e.preventDefault();  // supaya halaman gak reload
    try {
      await logoutUser();  // jalankan fungsi logoutUser (async)
      navigate('/login');  // arahkan ke halaman login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.name}</span>
            <img className="img-profile rounded-circle" src="http://localhost:3000/img/undraw_profile.svg" alt="" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="/#" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default ComponentHeader;
