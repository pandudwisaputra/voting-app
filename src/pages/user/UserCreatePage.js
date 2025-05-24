// Halaman untuk membuat pengguna baru
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { addUser } from '../../services/userService';
import MainLayout from '../../components/layout/MainLayout';

function UserCreatePage() {
    const navigate = useNavigate();
    // State untuk menyimpan data pengguna baru
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
    });

    // Handler untuk perubahan input form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    // Handler untuk submit form pembuatan pengguna baru
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await addUser(userData);
            alert(data.message);
            navigate('/user');
        } catch (error) {
            console.error('Error added user:', error);
        }
    };

    return (
        <MainLayout>
            <div className="container-fluid">
                <h1 className="h3 text-gray-800 mb-2">Add New User</h1>
                {/* Tombol untuk kembali ke halaman daftar pengguna */}
                <Link to="/user" className="btn btn-secondary mb-2">Back</Link>
                {/* Form untuk membuat pengguna baru */}
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Input nama pengguna */}
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name"
                                    value={userData.name} onChange={handleInputChange} className="form-control" required />
                            </div>
                            {/* Input email pengguna */}
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email"
                                    value={userData.email} onChange={handleInputChange} className="form-control" required />
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
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default UserCreatePage;
