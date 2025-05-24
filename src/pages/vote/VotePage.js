// Halaman untuk menampilkan hasil voting dari semua pengguna
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { fetchVotes } from "../../services/voteService";
import ClipLoader from "react-spinners/ClipLoader";

function VotePage() {
  // State untuk menyimpan data hasil voting
  const [votes, setVotes] = useState(null);

  // Fungsi untuk mengambil data hasil voting dari server
  const loadVotes = async () => {
    try {
      const response = await fetchVotes();
      setVotes(response);
    } catch (err) {
      console.error("Error fetching votes", err);
      setVotes([]);
    }
  };

  // Load data hasil voting saat komponen dimount
  useEffect(() => {
    loadVotes();
  }, []);

  return (
    <MainLayout>
      {!votes ? (
        // Tampilan loading saat data sedang diambil
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <ClipLoader size={50} color="#36d7b7" />
          <p>Loading Votes...</p>
        </div>
      ) : (
        <div className="container-fluid">
          <h1 className="h3 text-gray-800 mb-4">Vote Results</h1>
          {/* Tabel untuk menampilkan hasil voting */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Voter Name</th>
                      <th>Candidate Name</th>
                      <th>Description</th>
                      <th>Voted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votes.length > 0 ? (
                      // Render data hasil voting jika ada
                      votes.map((vote) => (
                        <tr key={vote.id}>
                          <td>{vote.id}</td>
                          <td>{vote.user.name}</td>
                          <td>{vote.candidate.name}</td>
                          <td>{vote.candidate.description}</td>
                          <td>{new Date(vote.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      // Tampilan jika tidak ada data hasil voting
                      <tr>
                        <td colSpan="5" className="text-center">
                          No vote data found.
                        </td>
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

export default VotePage;
