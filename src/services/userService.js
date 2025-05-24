import axiosClient from '../utils/axiosClient';

// Fungsi untuk mengambil semua data user dari server
export const fetchUsers = async () => {
    try {
        const response = await axiosClient.get('/users');
        return response.data.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error load users:', message);
    }
};

// Fungsi untuk menambahkan user baru ke server
export const addUser = async (params) => {
    try {
        const response = await axiosClient.post('/users', params);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error adding user:', message);
    }
};

// Fungsi untuk mengambil data user berdasarkan ID
export const getUser = async (id) => {
    try {
        const response = await axiosClient.get(`/users/${id}`);

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error get user:', message);
    }
};

// Fungsi untuk mengupdate data user berdasarkan ID
export const updateUser = async (id, params) => {
    try {
        const response = await axiosClient.put(`/users/${id}`, params);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error updating user:', message);
    }
};

// Fungsi untuk menghapus user berdasarkan ID
export const deleteUser = async (id) => {
    try {
        const response = await axiosClient.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error delete user:', message);
    }
};
