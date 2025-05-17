import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserAdd() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER', // valeurs alignées avec backend
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    // Préparer le payload sans confirmPassword
    const { confirmPassword, ...payload } = formData;

    fetch('http://localhost:3001/api/utilisateurs/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(async res => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Erreur lors de la création');
      }
      return res.json();
    })
    .then(() => {
      setMessage("Utilisateur ajouté avec succès !");
      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
      });
    })
    .catch(err => {
      setMessage(err.message);
    });
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un utilisateur</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Entrez le nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder="Entrez le prénom"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Entrez l'email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Entrez le mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Répétez le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rôle</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ADMIN">Administrateur</option>
            <option value="USER">Utilisateur</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </Form>
    </div>
  );
}

export default UserAdd;
