import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function UserEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/utilisateurs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de l'utilisateur");
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || '',
          surname: data.surname || '',
          email: data.email || '',
          password: '',
          confirmPassword: '',
          role: data.role || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Impossible de charger les données");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const payload = { ...form };
    if (!form.password) delete payload.password;

    fetch(`http://localhost:3001/api/utilisateurs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la mise à jour");
        console.log(res)
        return res.json();
      })
      .then(() => {
        setMessage("Mise à jour réussie !");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Échec de la mise à jour");
      });
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-3">
      <h4 className="mb-3">Modifier l'utilisateur #{id}</h4>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Mot de passe (laisser vide si inchangé)</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nouveau mot de passe"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Répéter le mot de passe"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rôle</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir un rôle --</option>
            <option value="ADMIN">Administrateur</option>
            <option value="USER">Utilisateur</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Mettre à jour
        </Button>
      </Form>
    </div>
  );
}

export default UserEdit;
