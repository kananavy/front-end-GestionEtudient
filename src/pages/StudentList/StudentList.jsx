import React, { useState, useEffect } from 'react';
import { Table, Form, InputGroup, Button, Pagination } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

// Exemple de données statiques (à remplacer par fetch API)
const exampleStudents = [
  { id: 1, matricule: '2025-ISSTM-001', nom: 'Rakoto', prenom: 'Jean' },
  { id: 2, matricule: '2025-ISSTM-002', nom: 'Andriana', prenom: 'Mina' },
  { id: 3, matricule: '2025-ISSTM-003', nom: 'Rasoa', prenom: 'Lala' },
  // ajoute plus d'étudiants ici ...
];

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    // Remplace par un fetch vers ton backend si besoin
    setStudents(exampleStudents);
  }, []);

  // Filtrer les étudiants selon la recherche (nom, prénom ou matricule)
  const filteredStudents = students.filter((student) =>
    student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination : calcul des étudiants à afficher
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h3 className="mb-4">Liste des étudiants</h3>

      <Form className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Rechercher par nom, prénom ou matricule"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page à 1 à chaque nouvelle recherche
            }}
          />
          <Button variant="primary">
            <Search />
          </Button>
        </InputGroup>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            {/* Ajouter colonnes selon besoin */}
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.matricule}</td>
                <td>{student.nom}</td>
                <td>{student.prenom}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Aucun étudiant trouvé
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={currentPage === idx + 1}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default StudentList;
