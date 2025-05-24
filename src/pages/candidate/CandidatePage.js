import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { fetchCandidates , deleteCandidate } from '../../services/candidateService';
import ClipLoader from 'react-spinners/ClipLoader';

// Halaman untuk menampilkan daftar kandidat dan mengelola data kandidat
function CandidatePage() {
    const [candidates, setCandidates] = useState(null);

    // Fungsi untuk memuat data kandidat dari server
    const loadCandidates = async () => {
        try {
            const data = await fetchCandidates();
            setCandidates(data);
        } catch (error) {
            setCandidates([]);
            console.error('Error loading candidates:', error);
        }
    };

    // Handler untuk menghapus kandidat
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            try {
            const data = await deleteCandidate(id);
            alert(data.message);
            loadCandidates();
        } catch (error) {
            console.error('Error delete candidates:', error);
        }
        }
    };

    // Load data kandidat saat komponen dimount
    useEffect(() => {
        loadCandidates();
    }, []);

    return (
        <MainLayout>
            {!candidates ? (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <ClipLoader size={50} color="#36d7b7" />
                    <p>Loading Candidates...</p>
                </div>
            ) : (
                <div className="container-fluid">
                    <h1 className="h3 text-gray-800 mb-2">Candidate Data</h1>
                    <Link to="/candidate/create" className="btn btn-primary mb-2">Create</Link>

                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.length > 0 ? (
                                            candidates.map((candidate, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{candidate.name}</td>
                                                    <td>{candidate.description}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Link
                                                                to={`/candidate/edit/${candidate.id}`}
                                                                className="btn btn-sm btn-info"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(candidate.id)}
                                                                className="btn btn-sm btn-danger"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">No candidates found</td>
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

export default CandidatePage;
