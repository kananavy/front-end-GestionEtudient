// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

function Register() {
    const [formData, setFormData] = useState({
      nom: '', prenom: '', email: '',
      password: '', confirmPassword: '', role: ''
    });
    const navigate = useNavigate();
  
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas !');
        return;
      }
  
      try {
        const { data } = await axios.post(
          'http://localhost:3001/api/utilisateurs/inscription',
          {
            name: formData.nom,
            surname: formData.prenom,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }
        );
  
        alert(data.message || 'Compte créé avec succès !');
        navigate('/');
      } catch (err) {
        console.error('Erreur lors de l’inscription :', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Erreur lors de l’inscription !');
      }
    };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-3" style={{ width: '100%', maxWidth: '400px', borderRadius: '0.75rem' }}>
        <h4 className="text-center mb-3 text-primary">Créer un compte</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label small">
              <FaUser className="me-1 text-muted" /> Nom
            </label>
            <input type="text" className="form-control rounded-pill px-3 py-1" name="nom" value={formData.nom} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label small">
              <FaUser className="me-1 text-muted" /> Prénom
            </label>
            <input type="text" className="form-control rounded-pill px-3 py-1" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label small">
              <FaEnvelope className="me-1 text-muted" /> Email
            </label>
            <input type="email" className="form-control rounded-pill px-3 py-1" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label small">
              <FaLock className="me-1 text-muted" /> Mot de passe
            </label>
            <input type="password" className="form-control rounded-pill px-3 py-1" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label small">
              <FaLock className="me-1 text-muted" /> Confirmer
            </label>
            <input type="password" className="form-control rounded-pill px-3 py-1" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small">
              <FaUserTag className="me-1 text-muted" /> Rôle
            </label>
            <select className="form-select rounded-pill px-3 py-1" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">-- Rôle --</option>
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill py-1 mb-2">S'inscrire</button>
          <p className="text-center small mb-0">
            Vous avez déjà un compte ? <Link to="/" className="text-decoration-none text-primary">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
