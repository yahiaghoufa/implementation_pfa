import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Footer from './Footer';
import Header from './Header';
import EventsSection from './EventsSection';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    regName: '',
    regEmail: '',
    regPassword: ''
  });

  useEffect(() => {
    const loadBotpress = async () => {
      try {
        if (!window.botpressWebChat) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        window.botpressWebChat.init({
          host: 'https://cdn.botpress.cloud/webchat/v2',
          botId: 'votre-bot-id',
          clientId: 'votre-client-id',
          messagingUrl: 'https://messaging.botpress.cloud',
          disableSessionStorage: true,
          enableReset: true,
          showPoweredBy: false,
          styles: {
            primaryColor: '#1a365d',
            secondaryColor: '#c5a047'
          }
        });

      } catch (error) {
        console.error('Erreur Botpress:', error);
        if (error.message.includes('init')) {
          console.error('Vérifiez les clés API et la configuration Botpress');
        }
      }
    };

    const timeout = setTimeout(loadBotpress, 2000);
    return () => {
      clearTimeout(timeout);
      if (window.botpressWebChat) {
        window.botpressWebChat.destroy();
      }
    };
  }, []);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post('http://localhost:3001/login', {
        email: formData.loginEmail,
        password: formData.loginPassword
      });
      if (result.data === "Success") {
        setIsAuthenticated(true);
        setShowLogin(false);
      } else {
        setErrors({ login: 'Invalid credentials' });
      }
    } catch (err) {
      setErrors({ login: 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post('http://localhost:3001/register', {
        name: formData.regName,
        email: formData.regEmail,
        password: formData.regPassword
      });
      if (result.data === "Already registered") {
        setErrors({ register: 'Email already registered' });
      } else {
        alert('Registration successful! Please login.');
        setShowRegister(false);
        setShowLogin(true);
      }
    } catch (err) {
      setErrors({ register: 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="university-page">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />

      <main className="main-content">
        <div className="hero-section">
          <h1>Bienvenue à EVENTY</h1>
          <p>Gestion des clubs universitaires</p>
        </div>

        <div className="isimm-info">
          <div className="about-section text-center">
            <h2 className="section-title">À propos de EVENTY</h2>
            <p className="about-description">
              EVENTY est la plateforme numérique dédiée à la gestion et à l'organisation 
              des clubs universitaires de l'ISIMM. Notre solution centralise toutes les 
              activités étudiantes, facilite la planification d'événements, et renforce 
              la collaboration entre les différents clubs grâce à des outils modernes 
              de gestion et de communication.
            </p>
            <div className="highlights">
              <div className="highlight-card">
                <h3>Fonctionnalités Clés</h3>
                <ul>
                  <li>Gestion centralisée des événements</li>
                  <li>Inscriptions en ligne</li>
                  <li>Calendrier interactif</li>
                  <li>Espace collaboratif</li>
                </ul>
              </div>
              <div className="highlight-card">
                <h3>Avantages</h3>
                <ul>
                  <li>Optimisation des processus</li>
                  <li>Visibilité des activités</li>
                  <li>Interaction en temps réel</li>
                  <li>Rapports automatisés</li>
                </ul>
              </div>
              <div className="highlight-card">
                <h3>Pour les Étudiants</h3>
                <ul>
                  <li>Accès unifié aux activités</li>
                  <li>Notifications personnalisées</li>
                  <li>Participation simplifiée</li>
                  <li>Suivi des engagements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="news-section">
            <h2>Actualités des Clubs</h2>
            <div className="news-card">
              <h3>Événements à venir</h3>
              <p>Découvrez les prochaines activités organisées par les clubs de l'ISIMM.</p>
            </div>
            <div className="news-card">
              <h3>Inscriptions ouvertes</h3>
              <p>Rejoignez les clubs universitaires pour l'année 2024-2025.</p>
            </div>
          </div>
        </div>

        <EventsSection />

      </main>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Connexion</h3>
              <button onClick={() => setShowLogin(false)} className="close-btn">
                &times;
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Universitaire</label>
                <input
                  type="email"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.login && <p className="error">{errors.login}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
              <p className="modal-footer-text">
                Pas de compte?{' '}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  S'inscrire
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Inscription</h3>
              <button onClick={() => setShowRegister(false)} className="close-btn">
                &times;
              </button>
            </div>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nom Complet</label>
                <input
                  type="text"
                  name="regName"
                  value={formData.regName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Universitaire</label>
                <input
                  type="email"
                  name="regEmail"
                  value={formData.regEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="regPassword"
                  value={formData.regPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.register && <p className="error">{errors.register}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Inscription...' : "S'inscrire"}
              </button>
              <p className="modal-footer-text">
                Déjà inscrit?{' '}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Se connecter
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;