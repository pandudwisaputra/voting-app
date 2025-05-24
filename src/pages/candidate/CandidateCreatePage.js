import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { addCandidate } from '../../services/candidateService';
import MainLayout from '../../components/layout/MainLayout';

// Halaman untuk menambahkan kandidat baru
function CandidateCreatePage() {
  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState({
    name: "",
    description: "",
  });

  // Handler untuk mengubah input form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCandidateData({ ...candidateData, [name]: value });
  };

  // Handler untuk submit form dan menyimpan data kandidat
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addCandidate(candidateData);
      alert(data.message);
      navigate('/candidate');
    } catch (error) {
      console.error('Error added candidates:', error);
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid">
        <h1 className="h3 text-gray-800 mb-2">Add New Candidate</h1>
        <Link to="/candidate" className="btn btn-secondary mb-2">Back</Link>
        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name"
                  value={candidateData.name} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input type="text" name="description"
                  value={candidateData.description} onChange={handleInputChange} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CandidateCreatePage;
