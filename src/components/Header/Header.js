import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Header/Header.css';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header({ isSidebarOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name || user.email || 'Utilisateur');
    } else {
      setUsername('');
    }
  }, []);

  // --- AJOUT : mise à jour périodique statut actif ---
  useEffect(() => {
    const updateActiveStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        localStorage.setItem(
          'userActive',
          JSON.stringify({ email: user.email, lastActive: Date.now() })
        );
      }
    };

    updateActiveStatus(); // Update au montage
    const interval = setInterval(updateActiveStatus, 60000); // puis toutes les 1 min

    return () => clearInterval(interval);
  }, []);

  const initial = username ? username.charAt(0).toUpperCase() : '?';

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userActive'); // supprimer aussi le statut actif
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={`header ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="breadcrumbs"></div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          ref={dropdownRef}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <div
            onClick={handleToggleMenu}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#0d6efd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            title={username}
          >
            {initial}
          </div>

          <span className="user-name"> {username}</span>

          <button className="notification-btn" aria-label="Déconnexion" onClick={handleLogout}>
            <FaPowerOff />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
