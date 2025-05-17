import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Badge,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Options et cursus
const niveauOptions = [
  { code: 'LICENCE_PRO', label: 'Licence professionnelle' },
  { code: 'MASTER_ING', label: 'Master Ingénieur' },
];

const mentionOptions = ['STNPA', 'STI', 'STGC'];

const statutOptions = [
  { code: 'ACTIF', label: 'Actif' },
  { code: 'INACTIF', label: 'Inactif' },
];

const cursus = {
  LICENCE_PRO: {
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
  MASTER_ING: {
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

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [niveau, setNiveau] = useState('');
  const [mention, setMention] = useState('');
  const [parcours, setParcours] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:3001/api/etudiants',{headers: { 
      Authorization: `Bearer ${token}`
    }})
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Erreur chargement étudiants :', err));
  }, []);

  const mentions = niveau ? Object.keys(cursus[niveau]) : [];
  const parcoursList = niveau && mention ? cursus[niveau][mention] : [];

  const filtered = students.filter((s) => {
    const matchSearch =
      s.nom.toLowerCase().includes(search.toLowerCase()) ||
      s.prenom?.toLowerCase().includes(search.toLowerCase()) ||
      s.numero_inscription?.toLowerCase().includes(search.toLowerCase());
    const matchNiveau = !niveau || s.niveau === niveau;
    const matchMention = !mention || s.mention === mention;
    const matchParcours = !parcours || s.parcours === parcours;
    return matchSearch && matchNiveau && matchMention && matchParcours;
  });

  const findLabel = (options, code) => {
    const opt = options.find((o) => (typeof o === 'string' ? o === code : o.code === code));
    if (typeof opt === 'string') return opt;
    return opt ? opt.label : code;
  };

  const handleDelete = (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      fetch(`http://localhost:3001/api/etudiants/${id}`, {
        method: 'DELETE',
      })
        .then(() => setStudents((prev) => prev.filter((s) => s.id !== id)))
        .catch((err) => console.error('Erreur suppression :', err));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Liste des étudiants</h2>
        <Button as={Link} to="/etudiants/add" variant="warning">
          <FaPlus className="me-2" /> Ajouter un étudiant
        </Button>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Rechercher par nom, prénom ou matricule"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Select
            value={niveau}
            onChange={(e) => {
              setNiveau(e.target.value);
              setMention('');
              setParcours('');
            }}
          >
            <option value="">-- Filtrer par niveau --</option>
            {niveauOptions.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={mention}
            onChange={(e) => {
              setMention(e.target.value);
              setParcours('');
            }}
            disabled={!niveau}
          >
            <option value="">-- Filtrer par mention --</option>
            {mentions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={parcours}
            onChange={(e) => setParcours(e.target.value)}
            disabled={!mention}
          >
            <option value="">-- Filtrer par parcours --</option>
            {parcoursList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Table responsive bordered hover>
        <thead className="table-warning">
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Niveau</th>
            <th>Mention</th>
            <th>Parcours</th>
            <th>Statut</th>
            <th style={{ width: '130px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.numero_inscription}</td>
                <td>{s.nom}</td>
                <td>{s.prenom}</td>
                <td>{s.sexe === 'HOMME' ? 'Masculin' : s.sexe === 'FEMME' ? 'Féminin' : '-'}</td>
                <td>{findLabel(niveauOptions, s.niveau)}</td>
                <td>{s.mention}</td>
                <td>{s.parcours}</td>
                <td>
                  <Badge bg={s.statut === 'ACTIF' ? 'success' : 'secondary'}>
                    {findLabel(statutOptions, s.statut)}
                  </Badge>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/etudiants/edition/${s.id}`}
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
                    onClick={() => handleDelete(s.id)}
                    title="Supprimer"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                Aucun étudiant trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
