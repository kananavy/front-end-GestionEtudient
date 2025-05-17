// src/pages/Settings/About.jsx
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Paramètres &amp; À propos</h2>

      {/* À propos de l'application */}
      <Card className="mb-4">
        <Card.Header>À propos de l'application</Card.Header>
        <Card.Body>
          <p>
            Cette application de gestion statistique a été développée pour
            simplifier le suivi des étudiants et utilisateurs. Inspirée du style
            Vuxy, elle offre une interface claire.
          </p>
          <ul>
            <li>
              <strong>Version :</strong> 1.0.0
            </li>
            <li>
              <strong>Auteur :</strong> RASOLOFONIAINA Clarita
            </li>
            <li>
              <strong>Nom d'application :</strong> SIM-ISSTM (Système
              d’Informations des Membres ISSTM)
            </li>
            <li>
              <strong>Git :</strong>{" "}
              <a href="https://github.com/Clarita511" target="_blank">
                Clarita511
              </a>
            </li>
            <li>
              <strong>Contact :</strong>{" "}
              <a href="mailto:claritarasolofoniaina022@gmail.com">
                claritarasolofoniaina022@gmail.com
              </a>
            </li>
          </ul>

          <p>
            <em>C'est une gestion d'étudiants ISSTM.</em>
          </p>
        </Card.Body>
      </Card>

      {/* Paramètres généraux */}
      <Card className="mb-4">
        <Card.Header>Paramètres généraux</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Langue :</strong> Français
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Mode :</strong> Clair
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <p>
                <strong>Notifications :</strong> Activées
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Support :</strong>{" "}
                <a href="mailto:support@educuma.org">support@educuma.org</a>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Informations développeur */}
      <Card>
        <Card.Header>Informations développeur</Card.Header>
        <Card.Body>
          <p>
            Cette application a été conçue et développée par{" "}
            <strong>RASOLOFONIAINA Clarita</strong>, étudiante à l'ISSTM
            Mahajanga.
          </p>
          <p>
            Pour plus d'informations ou collaborations, contactez-nous via{" "}
            <a href="mailto:claritarasolofoniaina022@gmail.com">
                claritarasolofoniaina022@gmail.com
              </a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
