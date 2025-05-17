import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// src/index.js
import './App.css'; // Ton propre CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap

import ProtectedLayout from './layouts/ProtectedLayout';  // importer
import DashboardOverview from './pages/DashboardOverview/DashboardOverview';
import UserList from './pages/User/UserList';
import UserAdd from './pages/User/UserAdd';
import UserEdit from './pages/User/UserEdit';
import StudentList from './pages/StudentList/StudentList';
import StudentEdit from './pages/StudentList/StudentEdit';
import StudentAdd from './pages/StudentList/StudentAdd';
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
        {/* Page login : sans sidebar ni header */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Toutes les autres pages protégées avec sidebar + header */}
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/utilisateurs" element={<UserList />} />
                <Route path="/users/add" element={<UserAdd />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
                <Route path="/etudiants" element={<StudentList />} />
                <Route path="/etudiants/add" element={<StudentAdd />} />
                <Route path="/etudiants/edition/:id" element={<StudentEdit />} />
                <Route path="/statistiques" element={<Statistics />} />
                <Route path="/parametres" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
