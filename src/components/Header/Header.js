import React, { useState } from 'react';
import { Navbar, Container, Nav, Dropdown, Image, Button } from 'react-bootstrap';
import { Sun, Moon, Person, BoxArrowRight } from 'react-bootstrap-icons';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="shadow-sm">
      <Container fluid>
        {/* Logo & Titre */}
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <Image src="/logo.png" alt="Logo" height="30" />
          <span className="fw-bold">Gestion Étudiant</span>
        </Navbar.Brand>

        {/* Actions à droite */}
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {/* Bouton mode clair/sombre */}
          <Button variant={darkMode ? 'light' : 'outline-dark'} onClick={toggleTheme}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>

          {/* Dropdown utilisateur */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-user">
              <Image
                src="https://i.pravatar.cc/40"
                roundedCircle
                height="30"
                alt="Avatar"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">
                <Person className="me-2" /> Profil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">
                <BoxArrowRight className="me-2" /> Déconnexion
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
