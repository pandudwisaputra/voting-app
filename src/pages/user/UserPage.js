// Halaman untuk menampilkan dan mengelola data pengguna
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { fetchUsers, deleteUser } from '../../services/userService';
import ClipLoader from 'react-spinners/ClipLoader';

function UserPage() {
  // State untuk menyimpan data pengguna
  const [users, setUsers] = useState(null);

  // Fungsi untuk mengambil data pengguna dari server
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setUsers([]);
      console.error('Error loading users:', error);
    }
  };

  // Fungsi untuk menghapus pengguna berdasarkan ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const data = await deleteUser(id);
        alert(data.message);
        loadUsers();
      } catch (error) {
        console.error('Error delete user:', error);
      }
    }
  };

  // Load data pengguna saat komponen dimount
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <MainLayout>
      {!users ? (
        // Tampilan loading saat data sedang diambil
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <ClipLoader size={50} color="#36d7b7" />
          <p>Loading Users...</p>
        </div>
      ) : (
        <div className="container-fluid">
          <h1 className="h3 text-gray-800 mb-2">User Data</h1>
          {/* Tombol untuk membuat pengguna baru */}
          <Link to="/user/create" className="btn btn-primary mb-2">Create</Link>

          {/* Tabel untuk menampilkan data pengguna */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      // Render data pengguna jika ada
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          {/* Tombol aksi hanya ditampilkan untuk pengguna dengan role voter */}
                          {user.role === 'voter' ? (
                            <td>
                              <Link
                                to={`/user/edit/${user.id}`}
                                className="btn btn-sm btn-info"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-sm btn-danger ml-1"
                              >
                                Delete
                              </button>
                            </td>
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      ))
                    ) : (
                      // Tampilan jika tidak ada data pengguna
                      <tr>
                        <td colSpan="4" className="text-center">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default UserPage;
