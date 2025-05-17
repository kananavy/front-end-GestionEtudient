// src/pages/StudentAdd/StudentAdd.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const cursus = {
  'Licence professionnelle': {
    STNPA: [
      'Génie Informatique',
      'Génie Électronique Informatique',
      'Génie Biomédical (L2 après PACES ou équivalent)',
    ],
    STI: ['Génie Électrique', 'Génie Industriel', 'Froid et Énergie'],
    STGC: [
      'Bâtiments et Travaux Publics',
      'Génie Hydraulique',
      "Génie de l'Architecture",
    ],
  },
  'Master Ingénieur': {
    STNPA: [
      'Génie Logiciel',
      'Électronique et Informatique Industrielle',
      'Télécommunications et Réseaux',
      'Génie Biomédical',
    ],
    STI: [
      'Ingénierie des Systèmes Électriques Automatisés',
      'Génie Industriel',
      'Froid et Énergie',
    ],
    STGC: [
      'Bâtiments et Travaux Publics',
      'Aménagements et Travaux Publics',
      'Hydrauliques et Ouvrages',
    ],
  },
};

export default function StudentAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    numero_inscription: '',
    niveau: '',
    mention: '',
    parcours: '',
    statut: 'Actif',
    sexe: '',
  });

  const mentions = form.niveau ? Object.keys(cursus[form.niveau]) : [];
  const parcours = form.niveau && form.mention ? cursus[form.niveau][form.mention] : [];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/etudiants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Erreur lors de l’ajout');

      await response.json();
      alert('Étudiant ajouté avec succès !');
      navigate('/etudiants');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout de l'étudiant");
    }
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h3 className="mb-4 text-warning fw-bold">Ajout d’un étudiant</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="Ex : RAKOTOARISOA"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Prénom(s)</Form.Label>
                  <Form.Control
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Ex : Jean Louis"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Numéro d’inscription</Form.Label>
                  <Form.Control
                    name="numero_inscription"
                    value={form.numero_inscription}
                    onChange={handleChange}
                    required
                    placeholder="Ex : ISST21-10-17FGCI/G.Info"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sexe</Form.Label>
                  <Form.Select
                    name="sexe"
                    value={form.sexe}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Niveau</Form.Label>
                  <Form.Select
                    name="niveau"
                    value={form.niveau}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        niveau: e.target.value,
                        mention: '',
                        parcours: '',
                      })
                    }
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    {Object.keys(cursus).map((niv) => (
                      <option key={niv}>{niv}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Mention</Form.Label>
                  <Form.Select
                    name="mention"
                    value={form.mention}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        mention: e.target.value,
                        parcours: '',
                      })
                    }
                    disabled={!form.niveau}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    {mentions.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Parcours</Form.Label>
                  <Form.Select
                    name="parcours"
                    value={form.parcours}
                    onChange={handleChange}
                    disabled={!form.mention}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    {parcours.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                name="statut"
                value={form.statut}
                onChange={handleChange}
              >
                <option>Actif</option>
                <option>Inactif</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="warning" type="submit">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
