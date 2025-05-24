import axiosClient from '../utils/axiosClient';

// Fungsi untuk mengambil semua data voting dari server
export const fetchVotes = async () => {
    try {
        const response = await axiosClient.get('/votes');
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error load votes:', message);
    }
};

// Fungsi untuk menambahkan voting baru ke server
export const addVote = async (params) => {
    try {
        const response = await axiosClient.post('/vote', params);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error adding vote:', message);
    }
};

// Fungsi untuk mengambil data voting user yang sedang login
export const getVote = async () => {
    try {
        const response = await axiosClient.get('/vote');

        return response.data;
    } catch (error) {
        if (error.response?.status !== 404) {
            const message =
                error.response?.data?.message || error.message || 'failed';
            alert('Error get vote: ' + message);
        }
    }
};

