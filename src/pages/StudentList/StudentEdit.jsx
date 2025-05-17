// src/pages/StudentEdit.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

/* ─── Options de sélection ─────────────────────────── */
const niveauOptions = [
  { code: 'L1', label: 'L1' },
  { code: 'L2', label: 'L2' },
  { code: 'L3', label: 'L3' },
  { code: 'M1', label: 'M1' },
  { code: 'M2', label: 'M2' },
];

const sexeOptions = [
  { code: "HOMME", label: "Masculin" },
  { code: "FEMME", label: "Féminin" },
];

const statutOptions = [
  { code: "ACTIF", label: "Actif" },
  { code: "INACTIF", label: "Inactif" },
];

/* ─── Cursus dépendant Niveau → Mention → Parcours ─── */
const cursus = {
  L1: {
    STNPA: [
      'Génie Informatique',
      'Génie Électronique Informatique',
      'Génie Biomédical',
    ],
    STI: [
      'Génie Civil',
      'Génie Industriel',
    ],
    STGC: [
      'Gestion',
      'Comptabilité',
    ],
  },
  L2: {
    STNPA: [
      'Génie Informatique',
      'Génie Électronique Informatique',
      'Génie Biomédical (L2 après PACES ou équivalent)',
    ],
    STI: [
      'Génie Civil Avancé',
      'Génie Industriel',
    ],
    STGC: [
      'Gestion des Organisations',
      'Fiscalité',
    ],
  },
  L3: {
    STNPA: [
      'Génie Informatique',
      'Génie Électronique Informatique',
      'Génie Biomédical',
    ],
    STI: [
      'Structures et Travaux Publics',
      'Mécatronique',
    ],
    STGC: [
      'Audit',
      'Finance d’entreprise',
    ],
  },
  M1: {
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
  M2: {
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


export default function StudentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* ─── État du formulaire ─────────────────────────── */
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    numero_inscription: "",
    niveau: "",
    mention: "",
    parcours: "",
    sexe: "",
    statut: "ACTIF",
  });

  /* Listes dépendantes */
  const mentions = form.niveau ? Object.keys(cursus[form.niveau]) : [];
  const parcours =
    form.niveau && form.mention ? cursus[form.niveau][form.mention] : [];

  /* ─── Charger l'étudiant à éditer ─────────────────── */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/etudiants/${id}`);
        if (!res.ok) throw new Error("Erreur de récupération");
        const data = await res.json();
        setForm({
          nom: data.nom ?? "",
          prenom: data.prenom ?? "",
          numero_inscription: data.numero_inscription ?? "",
          niveau: data.niveau ?? "",
          mention: data.mention ?? "",
          parcours: data.parcours ?? "",
          sexe: data.sexe ?? "",
          statut: data.statut ?? "ACTIF",
        });
      } catch (err) {
        console.error(err);
        alert("Impossible de charger cet étudiant.");
      }
    })();
  }, [id]);

  /* ─── Handlers ────────────────────────────────────── */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/etudiants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur de mise à jour");
      await res.json();
      alert("Étudiant modifié avec succès !");
      navigate("/etudiants");
    } catch (err) {
      console.error(err);
      alert("Échec de la modification de l'étudiant.");
    }
  };

  /* ─── Rendu ───────────────────────────────────────── */
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-warning">Modifier un étudiant</h2>

      <Form onSubmit={handleSubmit}>
        {/* Nom & Prénom */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Ex : RAKOTOARISOA"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Ex : Jean"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Numéro d'inscription */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Numéro d’inscription</Form.Label>
              <Form.Control
                name="numero_inscription"
                value={form.numero_inscription}
                onChange={handleChange}
                placeholder="Ex : ISST21-10-17FGCI/G.Info"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Niveau / Mention / Parcours */}
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
                    mention: "",
                    parcours: "",
                  })
                }
                required
              >
                <option value="">-- Sélectionner --</option>
                {niveauOptions.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
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
                  setForm({ ...form, mention: e.target.value, parcours: "" })
                }
                disabled={!form.niveau}
                required
              >
                <option value="">-- Sélectionner --</option>
                {mentions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
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
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Sexe & Statut */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="formSexe">
              <Form.Label>Sexe</Form.Label>
              <Form.Select
                name="sexe"
                value={form.sexe || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionner --</option>
                {sexeOptions.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Statut</Form.Label>
              <Form.Select
                name="statut"
                value={form.statut}
                onChange={handleChange}
                required
              >
                {statutOptions.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="warning">
            Enregistrer
          </Button>
        </div>
      </Form>
    </div>
  );
}
