import MainLayout from '../../components/layout/MainLayout';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getCandidate, updateCandidate } from '../../services/candidateService';
import ClipLoader from 'react-spinners/ClipLoader';

// Halaman untuk mengedit data kandidat yang sudah ada
function CandidateEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidateData, setCandidateData] = useState({
        name: null,
        description: null
    });

    // Load data kandidat berdasarkan ID
    const loadCandidate = useCallback(async () => {
        try {
            const data = await getCandidate(id);
            setCandidateData({
                name: data.candidate.name,
                description: data.candidate.description
            });
        } catch (error) {
            console.error("Gagal load kandidat:", error);
        }
    }, [id]);

    useEffect(() => {
        loadCandidate();
    }, [loadCandidate]);

    // Handler untuk mengubah input form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCandidateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler untuk submit form dan mengupdate data kandidat
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await updateCandidate(id, candidateData);
            alert(data.message);
            navigate('/candidate');
        } catch (error) {
            console.error('Error edit candidates:', error);
        }
    };

    return (
        <MainLayout>
            {!candidateData.name ? (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <ClipLoader size={50} color="#36d7b7" />
                    <p>Loading Candidates...</p>
                </div>
            ) : (
                <div className="container-fluid">
                    <h1 className="h3 text-gray-800 mb-2">Edit Candidate</h1>
                    <Link to="/candidate" className="btn btn-secondary mb-2">Back</Link>
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nama:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={candidateData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Deskripsi:</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={candidateData.description}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
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

export default CandidateEditPage;
