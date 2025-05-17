import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const StudentAdd = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    filiere: '',
    specialite: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.matricule || !form.nom || !form.prenom) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setError('');
    onAdd(form);
  };

  return (
    <Container className="py-4">
      <h3>Ajouter un nouvel étudiant</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="matricule">
              <Form.Label>Matricule *</Form.Label>
              <Form.Control
                type="text"
                name="matricule"
                value={form.matricule}
                onChange={handleChange}
                placeholder="Entrez le matricule"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="nom">
              <Form.Label>Nom *</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Entrez le nom"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="prenom">
              <Form.Label>Prénom *</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Entrez le prénom"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="filiere">
              <Form.Label>Filière</Form.Label>
              <Form.Control
                type="text"
                name="filiere"
                value={form.filiere}
                onChange={handleChange}
                placeholder="Entrez la filière"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="specialite">
              <Form.Label>Spécialité</Form.Label>
              <Form.Control
                type="text"
                name="specialite"
                value={form.specialite}
                onChange={handleChange}
                placeholder="Entrez la spécialité"
              />
            </Form.Group>
          </Col>
        </Row>

        <div>
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="success" type="submit">
            Ajouter
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default StudentAdd;
