import ChatPopup from "./Chat";

const Header = ({ isAuthenticated, setIsAuthenticated, setShowLogin, setShowRegister }) => {
  return (
    <header className="compact-header">
      <div className="header-content">
        <div className="logo-title">
        <img src="/logo_isimm.jpg" alt="Logo APP" className="header-logo" />
        <div className="site-info">
            <h1>Plateforme de Gestion des Clubs</h1>
            <p className="site-subtitle">Un Outil Moderne au Service de la Vie Étudiante</p>
          </div>
        </div>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="auth-btn login-btn"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="auth-btn login-btn"
              >
                Connexion
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="auth-btn register-btn"
              >
                Inscription
              </button>
            </>
          )}
        </div>
      </div>

      <ChatPopup />
    </header>
  );
};

export default Header;
