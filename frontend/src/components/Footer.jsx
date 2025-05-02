export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a 
            href="http://www.isimm.rnu.tn/public/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="bi bi-building"></i>
            Site Officiel
          </a>
          
          <span className="link-separator">|</span>
          
          <a 
            href="https://www.linkedin.com/school/isimm/posts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="bi bi-linkedin"></i>
            LinkedIn
          </a>
          
          <span className="link-separator">|</span>
          
          <a 
            href="http://www.isimm.rnu.tn/public/contact" 
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="bi bi-envelope"></i>
            Contact
          </a>
        </div>
        
        <div className="copyright">
          © {currentYear} ISIM Monastir - Gestion des Clubs Universitaires
        </div>
      </div>
    </footer>
  );
}