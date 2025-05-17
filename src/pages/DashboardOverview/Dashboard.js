import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { PeopleFill, PersonBadge, BookHalf } from 'react-bootstrap-icons';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalUsers: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  // Récupération simulée depuis le backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Remplacer cette URL par votre propre API
        const res = await fetch('http://localhost:8080/api/dashboard');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Erreur chargement statistiques', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4">Tableau de bord</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          <Col md={4} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <PeopleFill size={32} className="text-primary me-3" />
                  <div>
                    <h5 className="mb-0">{stats.totalStudents}</h5>
                    <small className="text-muted">Étudiants</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <PersonBadge size={32} className="text-success me-3" />
                  <div>
                    <h5 className="mb-0">{stats.totalUsers}</h5>
                    <small className="text-muted">Utilisateurs</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <BookHalf size={32} className="text-warning me-3" />
                  <div>
                    <h5 className="mb-0">{stats.totalCourses}</h5>
                    <small className="text-muted">Cours</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
