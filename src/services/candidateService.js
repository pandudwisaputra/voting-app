import axiosClient from '../utils/axiosClient';

// Fungsi untuk mengambil semua data kandidat dari server
export const fetchCandidates = async () => {
    try {
        const response = await axiosClient.get('/candidates');
        return response.data.candidates;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error load candidates:', message);
    }
};

// Fungsi untuk menambahkan kandidat baru ke server
export const addCandidate = async (params) => {
    try {
        const response = await axiosClient.post('/candidates', params);

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error adding candidate:', message);
    }
};

// Fungsi untuk mengambil data kandidat berdasarkan ID
export const getCandidate = async (id) => {
    try {
        const response = await axiosClient.get(`/candidates/${id}`);

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error get candidate:', message);
    }
};

// Fungsi untuk mengupdate data kandidat berdasarkan ID
export const updateCandidate = async (id, params) => {
    try {
        const response = await axiosClient.put(`/candidates/${id}`, params);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error updating candidate:', message);
    }
};

// Fungsi untuk menghapus kandidat berdasarkan ID
export const deleteCandidate = async (id) => {
    try {
        const response = await axiosClient.delete(`/candidates/${id}`);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || error.message || 'failed';
        alert('Error delete candidate:', message);
    }
};
