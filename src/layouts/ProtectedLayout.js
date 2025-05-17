import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

export default function ProtectedLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div
        className="main-content-area"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Header isSidebarOpen={isSidebarOpen} />

        <main
          className="content"
          style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            marginTop: '70px',
            marginLeft: isSidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
