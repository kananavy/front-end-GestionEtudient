import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Form, Table } from 'react-bootstrap';
import { FaUniversity, FaGraduationCap, FaList } from 'react-icons/fa';

const formations = {
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

export default function DashboardOverview() {
  const [niveau, setNiveau] = useState('');
  const [mention, setMention] = useState('');
  const [parcours, setParcours] = useState('');

  const mentions = niveau ? Object.keys(formations[niveau]) : [];
  const parcoursList =
    niveau && mention ? formations[niveau][mention] : [];

  const lignes = useMemo(() => {
    const res = [];
    Object.entries(formations).forEach(([niv, mentionsObj]) => {
      if (niveau && niv !== niveau) return;
      Object.entries(mentionsObj).forEach(([men, parcs]) => {
        if (mention && men !== mention) return;
        parcs.forEach((parc) => {
          if (parcours && parc !== parcours) return;
          res.push({ niveau: niv, mention: men, parcours: parc });
        });
      });
    });
    return res;
  }, [niveau, mention, parcours]);

  const countLicence = Object.values(formations['Licence professionnelle'] || {}).flat().length;
  const countMaster = Object.values(formations['Master Ingénieur'] || {}).flat().length;
  const totalParcours = countLicence + countMaster;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tableau de bord – ISSTM Mahajanga</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaUniversity size={36} className="text-primary mb-2" />
              <Card.Title>Licences professionnelles</Card.Title>
              <h3>{countLicence}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaGraduationCap size={36} className="text-success mb-2" />
              <Card.Title>Masters Ingénieur</Card.Title>
              <h3>{countMaster}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaList size={36} className="text-warning mb-2" />
              <Card.Title>Parcours disponibles</Card.Title>
              <h3>{totalParcours}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
            {Object.keys(formations).map((niv) => (
              <option key={niv}>{niv}</option>
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
              <option key={m}>{m}</option>
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
              <option key={p}>{p}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Card>
        <Card.Header>Liste des parcours disponibles</Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>Niveau</th>
                <th>Mention</th>
                <th>Parcours</th>
              </tr>
            </thead>
            <tbody>
              {lignes.length > 0 ? (
                lignes.map((item, index) => (
                  <tr key={index}>
                    <td>{item.niveau}</td>
                    <td>{item.mention}</td>
                    <td>{item.parcours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Aucun parcours trouvé.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
