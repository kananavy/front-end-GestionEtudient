import React from 'react';
import { Nav } from 'react-bootstrap';
import { HouseDoor, People, Gear } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <HouseDoor /> },
    { to: '/etudiants', label: 'Étudiants', icon: <People /> },
    { to: '/parametres', label: 'Paramètres', icon: <Gear /> },
  ];

  return (
    <div className="bg-light border-end vh-100 d-flex flex-column p-3 sidebar">
      <div className="mb-4">
        <h4 className="text-center fw-bold">ISSTM</h4>
      </div>

      <Nav className="flex-column">
        {navItems.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              as={Link}
              to={item.to}
              className={`d-flex align-items-center gap-2 px-3 py-2 ${location.pathname === item.to ? 'active-link' : ''}`}
            >
              {item.icon}
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
