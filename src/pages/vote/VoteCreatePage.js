// Halaman untuk melakukan voting pada kandidat
import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { fetchCandidates } from '../../services/candidateService';
import { addVote, getVote } from '../../services/voteService';
import ClipLoader from 'react-spinners/ClipLoader';

function VoteCreatePage() {
    // State untuk menyimpan daftar kandidat
    const [candidates, setCandidates] = useState([]);
    // State untuk menyimpan data voting pengguna
    const [voteData, setVote] = useState(null);
    // State untuk menyimpan kandidat yang dipilih
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    // State untuk menangani status loading
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data kandidat dari server
    const loadCandidates = async () => {
        try {
            const data = await fetchCandidates();
            setCandidates(data);
        } catch (error) {
            console.error('Failed to load candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil data voting pengguna dari server
    const loadVote = async () => {
        try {
            const data = await getVote();
            setVote(data);
        } catch (error) {
            console.error('Failed to load candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handler untuk submit form voting
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCandidate) {
            alert('Please select a candidate');
            return;
        }

        try {
            const response = await addVote({ candidate_id: selectedCandidate });
            alert(response.message || 'Vote submitted successfully');
            setSelectedCandidate(null);
            loadCandidates();
            loadVote();
        } catch (error) {
            console.error('Vote failed:', error);
        }
    };

    // Load data kandidat dan voting saat komponen dimount
    useEffect(() => {
        loadCandidates();
        loadVote();
    }, []);

    return (
        <MainLayout>
            {loading ? (
                // Tampilan loading saat data sedang diambil
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <ClipLoader size={50} color="#36d7b7" />
                    <p>Loading Candidates...</p>
                </div>
            ) : (
                <div className="container-fluid">
                    <h1 className="h3 text-gray-800 mb-4">Cast Your Vote</h1>
                    {/* Tampilan jika pengguna sudah melakukan voting */}
                    {voteData && (
                        <div className="alert alert-success">
                            You have already voted for <strong>{voteData.data.candidate.name}</strong>.
                        </div>
                    )}

                    {/* Form untuk memilih kandidat */}
                    <form onSubmit={handleSubmit}>
                        {candidates.length > 0 ? (
                            <div className="form-group">
                                {/* Render daftar kandidat yang tersedia */}
                                {candidates.map(candidate => (
                                    <div key={candidate.id} className="form-check mb-2">
                                        {/* Radio button hanya ditampilkan jika pengguna belum voting */}
                                        {!voteData && (
                                            <input
                                                type="radio"
                                                name="candidate"
                                                id={`candidate-${candidate.id}`}
                                                value={candidate.id}
                                                onChange={(e) => setSelectedCandidate(Number(e.target.value))}
                                                className="form-check-input"
                                            />
                                        )}
                                        <label className="form-check-label" htmlFor={`candidate-${candidate.id}`}>
                                            <strong>{candidate.name}</strong>: {candidate.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No candidates available.</p>
                        )}

                        {/* Tombol submit hanya ditampilkan jika pengguna belum voting */}
                        {!voteData && <button type="submit" className="btn btn-success mt-3">
                            Submit Vote
                        </button>}
                    </form>
                </div>
            )}
        </MainLayout>
    );
}

export default VoteCreatePage;
