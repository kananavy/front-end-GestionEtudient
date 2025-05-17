import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, InputGroup, FormControl, Badge, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(null);

  const API_URL = 'http://localhost:3001/api/utilisateurs';

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Lire user actif dans localStorage au montage et à chaque changement de stockage
    const storedActive = localStorage.getItem('userActive');
    if (storedActive) setActiveUser(JSON.parse(storedActive));

    // Optionnel : écouter le storage event pour actualiser si changement depuis un autre onglet
    const onStorageChange = (e) => {
      if (e.key === 'userActive') {
        if (e.newValue) setActiveUser(JSON.parse(e.newValue));
        else setActiveUser(null);
      }
    };
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  // Fonction pour vérifier si un utilisateur est actif (mise à jour il y a moins de 5 minutes)
  const isUserActive = (email) => {
    if (!activeUser) return false;
    return (
      email === activeUser.email && Date.now() - activeUser.lastActive < 5 * 60 * 1000 // 5 minutes
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Liste des utilisateurs</h2>
        <Button as={Link} to="/users/add" variant="primary">
          <FaPlus className="me-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Rechercher par nom ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table responsive bordered hover>
          <thead className="table-primary">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th style={{ width: '130px' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Badge bg={isUserActive(user.email) ? 'success' : 'secondary'}>
                      {isUserActive(user.email) ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/users/edit/${user.id}`}
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      title="Modifier"
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      title="Supprimer"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserList;
