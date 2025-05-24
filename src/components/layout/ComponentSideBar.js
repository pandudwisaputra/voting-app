// Import NavLink dari react-router-dom untuk navigasi
import { NavLink } from "react-router-dom";

// Komponen untuk menampilkan sidebar dengan menu navigasi aplikasi
function ComponentSideBar() {
  
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/#">
        <div className="sidebar-brand-text mx-3">Vote Admin</div>
      </a>

      <li className="nav-item">
        <NavLink to="/dashboard" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/vote/create" className="nav-link">
          <i className="fas fa-fw fa-vote-yea"></i>
          <span>Vote Candidate</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="/#" data-toggle="collapse" data-target="#masterSection" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog"></i>
          <span>Master</span>
        </a>
        <div id="masterSection" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink to="/user" className="collapse-item">User</NavLink>
            <NavLink to="/candidate" className="collapse-item">Candidate</NavLink>
            <NavLink to="/vote" className="collapse-item">Vote</NavLink>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ComponentSideBar;
