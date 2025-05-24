import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { fetchStatistics } from '../../services/statisticService';
import ClipLoader from 'react-spinners/ClipLoader';
import { useMemo } from 'react';

// Halaman dashboard untuk menampilkan statistik dan grafik voting
function DashboardPage() {
  const [data, setData] = useState(null);

  // Fungsi untuk mengambil data statistik dari server
  const fetchDashboardData = async () => {
    try {
      const data = await fetchStatistics();
      setData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Load data statistik saat komponen dimount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fungsi untuk menghasilkan warna acak untuk grafik
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate warna untuk setiap kandidat di grafik
  const colors = useMemo(() => {
    if (!data) return [];
    return data.votes_per_candidate.map(() => getRandomColor());
  }, [data]);

  return (
    <MainLayout>
      <div className="container-fluid">
        <h1 className="h3 text-gray-800 mb-4">Dashboard</h1>

        {!data ? (
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <ClipLoader size={50} color="#36d7b7" />
            <p>Loading Dashboard...</p>
          </div>
        ) : (
          <>
            {/* Card ringkasan statistik */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text">{data.total_users}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Votes</h5>
                    <p className="card-text">{data.total_votes}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Candidates</h5>
                    <p className="card-text">{data.total_candidates}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabel jumlah suara per kandidat */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h5 className="mb-0">Votes Per Candidate</h5>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Candidate Name</th>
                      <th>Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.votes_per_candidate.map((candidate) => (
                      <tr key={candidate.id}>
                        <td>{candidate.id}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.votes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grafik pie distribusi suara */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h5 className="mb-0">Vote Distribution</h5>
              </div>
              <div className="card-body d-flex justify-content-center">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data.votes_per_candidate}
                    dataKey="votes"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {data.votes_per_candidate.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
