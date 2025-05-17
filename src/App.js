import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'; // ton CSS perso
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap

import ProtectedLayout from './layouts/ProtectedLayout';

import DashboardOverview from './pages/DashboardOverview/Dashboard';
import UserList from './pages/User/UserList';
import UserAdd from './pages/User/UserAdd';
import UserEdit from './pages/User/UserEdit';
import StudentList from './pages/StudentList/StudentList';
import StudentAdd from './pages/StudentList/StudentAdd';
import StudentEdit from './pages/StudentList/StudentEdit';
import Statistics from './pages/Statistics/Statistics';
import About from './pages/Settings/About';
import Profile from './pages/User/Profile';
import Login from './pages/AuthPage/Login';
import Logout from './pages/AuthPage/Logout';
import Register from './pages/AuthPage/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques (sans sidebar ni header) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées avec layout (sidebar + header) */}
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Routes>
                {/* Redirection par défaut vers /dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />

                <Route path="dashboard" element={<DashboardOverview />} />

                {/* Utilisateurs */}
                <Route path="utilisateurs" element={<UserList />} />
                <Route path="users/add" element={<UserAdd />} />
                <Route path="users/edit/:id" element={<UserEdit />} />

                {/* Étudiants */}
                <Route path="etudiants" element={<StudentList />} />
                <Route path="etudiants/add" element={<StudentAdd />} />
                <Route path="etudiants/edition/:id" element={<StudentEdit />} />

                {/* Autres pages */}
                <Route path="statistiques" element={<Statistics />} />
                <Route path="parametres" element={<About />} />
                <Route path="profile" element={<Profile />} />
                <Route path="logout" element={<Logout />} />

                {/* Route catch-all dans layout pour afficher 404 ou rediriger */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
