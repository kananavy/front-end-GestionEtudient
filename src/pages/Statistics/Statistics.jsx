// src/pages/Statistics/Statistics.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Table,
  ButtonGroup,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import {
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from 'react-icons/fa';

const niveauLabels = {
  LICENCE_PRO: 'Licence professionnelle',
  MASTER_ING:  'Master Ingénieur',
};

export default function Statistics() {
  const [type, setType] = useState('etudiants');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [rows,  setRows]    = useState([]);

  useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      setError('');
      let token = localStorage.getItem('token');
      try {
        const url = type === 'etudiants'
          ? 'http://localhost:3001/api/etudiants/'
          : 'http://localhost:3001/api/utilisateurs/';
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRows(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };
    fetchRows();
  }, [type]);

  const stats = useMemo(() => {
    if (type === 'etudiants') {
      const totalStudents    = rows.length;
      const activeStudents   = rows.filter((s) => s.statut === 'ACTIF').length;
      const inactiveStudents = totalStudents - activeStudents;

      const repartitionByLevel = rows.reduce((acc, s) => {
        const label = niveauLabels[s.niveau] ?? s.niveau;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      const repartitionByMention = rows.reduce((acc, s) => {
        acc[s.mention] = (acc[s.mention] || 0) + 1;
        return acc;
      }, {});

      const repartitionByParcours = rows.reduce((acc, s) => {
        acc[s.parcours] = (acc[s.parcours] || 0) + 1;
        return acc;
      }, {});

      return {
        totalStudents,
        activeStudents,
        inactiveStudents,
        repartitionByLevel,
        repartitionByMention,
        repartitionByParcours,
      };
    }

    const totalUsers  = rows.length;
    const admins      = rows.filter((u) => u.role === 'ADMIN').length;
    const enseignants = rows.filter((u) => u.role === 'USER').length;

    const repartitionByRole = rows.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});

    return {
      totalUsers,
      admins,
      enseignants,
      repartitionByRole,
    };
  }, [rows, type]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4 text-center">
        {error}
      </Alert>
    );
  }

  const renderEtudiantStats = () => {
    const {
      totalStudents,
      activeStudents,
      inactiveStudents,
      repartitionByLevel,
      repartitionByMention,
      repartitionByParcours,
    } = stats;

    const pcActifs   = ((activeStudents   / totalStudents) * 100).toFixed(0);
    const pcInactifs = ((inactiveStudents / totalStudents) * 100).toFixed(0);

    return (
      <>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaUserGraduate size={40} className="mb-2 text-primary" />
                <Card.Title>Total étudiants</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalStudents}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaCheckCircle size={40} className="mb-2 text-success" />
                <Card.Title>Actifs</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{activeStudents}</Card.Text>
                <ProgressBar now={pcActifs} label={`${pcActifs}%`} variant="success" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaTimesCircle size={40} className="mb-2 text-danger" />
                <Card.Title>Inactifs</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{inactiveStudents}</Card.Text>
                <ProgressBar now={pcInactifs} label={`${pcInactifs}%`} variant="danger" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Répartition par niveau */}
        <Card className="mb-4">
          <Card.Header>Répartition par Niveau</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Niveau</th>
                  <th>Nombre d'étudiants</th>
                  <th>Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(repartitionByLevel).map(([niv, count]) => {
                  const pc = ((count / totalStudents) * 100).toFixed(1);
                  return (
                    <tr key={niv}>
                      <td>{niv}</td>
                      <td>{count}</td>
                      <td>{pc} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Répartition par mention */}
        <Card className="mb-4">
          <Card.Header>Répartition par Mention</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Mention</th>
                  <th>Nombre d'étudiants</th>
                  <th>Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(repartitionByMention).map(([mention, count]) => {
                  const pc = ((count / totalStudents) * 100).toFixed(1);
                  return (
                    <tr key={mention}>
                      <td>{mention}</td>
                      <td>{count}</td>
                      <td>{pc} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Répartition par parcours */}
        <Card>
          <Card.Header>Répartition par Parcours</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Parcours</th>
                  <th>Nombre d'étudiants</th>
                  <th>Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(repartitionByParcours).map(([parcours, count]) => {
                  const pc = ((count / totalStudents) * 100).toFixed(1);
                  return (
                    <tr key={parcours}>
                      <td>{parcours}</td>
                      <td>{count}</td>
                      <td>{pc} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  };

  const renderUtilisateurStats = () => {
    const { totalUsers, admins, enseignants, repartitionByRole } = stats;

    return (
      <>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaUsers size={40} className="mb-2 text-primary" />
                <Card.Title>Total utilisateurs</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaUserShield size={40} className="mb-2 text-warning" />
                <Card.Title>Admins</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{admins}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FaUserTie size={40} className="mb-2 text-info" />
                <Card.Title>Utilisateur</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>{enseignants}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>Répartition par Rôle</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Rôle</th>
                  <th>Nombre d'utilisateurs</th>
                  <th>Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(repartitionByRole).map(([role, count]) => {
                  const pc = ((count / totalUsers) * 100).toFixed(1);
                  return (
                    <tr key={role}>
                      <td>{role}</td>
                      <td>{count}</td>
                      <td>{pc} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Statistiques {type === 'etudiants' ? 'des étudiants' : 'des utilisateurs'}
      </h2>

      <ButtonGroup className="mb-4">
        <Button
          variant={type === 'etudiants' ? 'primary' : 'outline-primary'}
          onClick={() => setType('etudiants')}
        >
          Étudiants
        </Button>
        <Button
          variant={type === 'utilisateurs' ? 'primary' : 'outline-primary'}
          onClick={() => setType('utilisateurs')}
        >
          Utilisateurs
        </Button>
      </ButtonGroup>

      {type === 'etudiants' ? renderEtudiantStats() : renderUtilisateurStats()}
    </div>
  );
}
