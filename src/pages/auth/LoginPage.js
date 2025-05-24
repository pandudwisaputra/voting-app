import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../services/authService';

// Halaman login untuk autentikasi user
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cek jika user sudah login, redirect ke dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  },);

  // Handler untuk proses login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await loginUser(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '5rem' }}>
      <h2 className="text-center mb-4">Masuk</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Masukkan email Anda"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Kata Sandi</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Masukkan kata sandi Anda"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Masuk</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
