import React, { useState } from 'react';
import '../../App.css'; // Importer le fichier CSS
import '../../styles/AuthPage/AuthPage.css'; // ✅ Import correct du style
import logoImage from '../assets/Logo ISSTM.jpg'; // Ajustez ce chemin

function AuthPage() {
  // États pour stocker les valeurs des champs du formulaire
  const [annee, setAnnee] = useState('2024'); // Valeur par défaut
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log('Tentative de connexion avec :');
    console.log('Année:', annee);
    console.log('Username:', username);
    console.log('Password:', password); // Attention : Ne jamais logger les mots de passe en production
    console.log('Se souvenir de moi:', rememberMe);
    // Ici, vous ajouteriez la logique pour envoyer les données à votre backend
    // Exemple: fetch('/api/login', { method: 'POST', body: JSON.stringify({ annee, username, password, rememberMe }) })
    alert('Données soumises (voir console)'); // Juste pour démonstration
  };

  return (
    // Notez l'utilisation de className au lieu de class en JSX
    <div className="auth-container">
      {/* Utilisation de l'image importée */}
      <img src={logoImage} alt="Logo" className="auth-logo" />

      <h1>S'authentifier</h1>

      {/* Utilisation de l'événement onSubmit sur le formulaire */}
      <form onSubmit={handleSubmit}>
        {/* htmlFor remplace 'for' en JSX */}
        {/* Le 'value' et 'onChange' rendent les champs "contrôlés" par React */}
        <label htmlFor="annee">Année :</label>
        <select
          id="annee"
          name="annee"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          required>
          <option value="2021">2021</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="remember-me">
          {/* 'checked' et 'onChange' pour la case à cocher */}
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Se souvenir de moi</label>
        </div>

        <button type="submit">Connexion</button>
      </form>

      <p>
        {/* En React, utilisez react-router-dom pour la navigation interne,
            ou un lien normal pour les externes/fichiers statiques */}
        <a href="guide-utilisation.html">Guide d'utilisation de l'app</a>
      </p>
    </div>
  );
}

export default AuthPage; // Exporter le composant pour l'utiliser ailleurs


