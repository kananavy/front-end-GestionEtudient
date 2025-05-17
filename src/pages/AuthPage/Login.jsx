import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3001/api/utilisateurs/connexion', {
        email,
        password,
      });

      localStorage.setItem('token', data.token); // Ou sessionStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Facultatif
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-3" style={{ width: '100%', maxWidth: '400px', borderRadius: '0.75rem' }}>
        <h4 className="text-center mb-3 text-primary">Connexion</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">
              <FaUser className="me-1 text-muted" /> Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill px-3 py-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-4">
            <label className="form-label small">
              <FaLock className="me-1 text-muted" /> Mot de passe
            </label>
            <input
              type="password"
              className="form-control rounded-pill px-3 py-1"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-1 mb-2">
            Se connecter
          </button>

          <p className="text-center small mb-0">
            Vous n’avez pas encore de compte ?{' '}
            <Link to="/register" className="text-decoration-none text-primary">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
