// Import axios client yang sudah dikonfigurasi
import axiosClient from '../utils/axiosClient';

// Fungsi untuk mengambil data statistik voting dari server
export const fetchStatistics = async () => {
    try {
        const response = await axiosClient.get('/statistics');
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error load votes:', message);
    }
};