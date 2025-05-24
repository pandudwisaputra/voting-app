// src/components/layout/MainLayout.js
import ComponentHeader from './ComponentHeader';
import ComponentFooter from './ComponentFooter';
import ComponentSideBar from './ComponentSideBar';

// Komponen layout utama yang mengatur struktur halaman aplikasi
const MainLayout = ({ children }) => {
  const role = localStorage.getItem('role');

  return (
    <div id="wrapper" style={{ minHeight: '100vh', display: 'flex' }}>
      {role === 'admin' && <ComponentSideBar />}
      <div id="content-wrapper" className="d-flex flex-column flex-grow-1" style={{ flex: 1 }}>
        <div id="content">
          <ComponentHeader />
          <main style={{ flex: 1, padding: '1rem' }}>
            {children}
          </main>
        </div>
        <ComponentFooter />
      </div>
    </div>
  );
};

export default MainLayout;
