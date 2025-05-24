// Halaman untuk mengedit data pengguna yang sudah ada
import MainLayout from '../../components/layout/MainLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getUser, updateUser } from '../../services/userService';
import ClipLoader from 'react-spinners/ClipLoader';

function UserEditPage() {
    // Mengambil ID pengguna dari parameter URL
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State untuk menyimpan data pengguna yang akan diedit
    const [userData, setUserData] = useState({
        name: null,
        email: null,
        role: null
    });

    // Fungsi untuk mengambil data pengguna dari server berdasarkan ID
    const loadUser = useCallback(async () => {
        try {
            const data = await getUser(id);
            setUserData({
                name: data.data.name,
                email: data.data.email,
                role: data.data.role,
            });
        } catch (error) {
            console.error("Gagal load kandidat:", error);
        }
    }, [id]);

    // Load data pengguna saat komponen dimount
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // Handler untuk perubahan input form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler untuk submit form edit pengguna
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await updateUser(id, userData);
            alert(data.message);
            navigate('/user');
        } catch (error) {
            console.error('Error edit user:', error);
        }
    };

    return (
        <MainLayout>
            {!userData.name ? (
                // Tampilan loading saat data sedang diambil
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <ClipLoader size={50} color="#36d7b7" />
                    <p>Loading user...</p>
                </div>
            ) : (
                <div className="container-fluid">
                    <h1 className="h3 text-gray-800 mb-2">Edit User</h1>
                    {/* Form untuk mengedit data pengguna */}
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Input nama pengguna */}
                                <div className="form-group">
                                    <label>Nama:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {/* Input email pengguna */}
                                <div className="form-group">
                                    <label>Deskripsi:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {/* Select role pengguna */}
                                <div className="form-group">
                                    <label>Role:</label>
                                    <select
                                        name="role"
                                        value={userData.role}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">-- Select Role --</option>
                                        <option value="admin">Admin</option>
                                        <option value="voter">Voter</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

export default UserEditPage;
