import axiosClient from '../utils/axiosClient';

/**
 * Fungsi untuk melakukan proses login user dan menyimpan token ke localStorage
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {Object} Objek yang berisi status sukses dan data/error
 */
export const loginUser = async (email, password) => {
    try {
        // Kirim request POST ke endpoint login
        const response = await axiosClient.post('/login', { email, password });
        const { token, user } = response.data;

        // Simpan token dan role ke localStorage jika login berhasil
        if (token && user?.role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        // Handle error dengan mengambil pesan error dari response atau error message
        const message =
            error.response?.data?.message || error.message || 'Login failed';
        return {
            success: false,
            error: message,
        };
    }
};

/**
 * Fungsi untuk mengambil data profil user yang sedang login
 * @returns {Object} Data profil user
 */
export const fetchUserProfile = async () => {
    try {
        // Kirim request GET ke endpoint profile
        const response = await axiosClient.get('/profile');
        return response.data;
    } catch (error) {
        // Handle error dengan menampilkan alert
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error get profile:', message);
    }
};

/**
 * Fungsi untuk melakukan proses logout dan menghapus data user dari localStorage
 * @returns {void}
 */
export const logoutUser = async () => {
    try {
        // Kirim request POST ke endpoint logout
        const response = await axiosClient.post('/logout');
        console.log(response.data);
        
        // Hapus data user dari localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    } catch (error) {
        // Handle error dengan menampilkan alert
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error logout:', message);
    }
};
