import '../styles/Footer.css';

/*
 * Footer — the page's link directory + quiet bottom edge. Channels that don't
 * need to sit up top live here: LinkedIn, GitHub, publication profiles, and the
 * Resources link. Identity + copyright anchor the left.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-id">
          <span className="footer-name">Mitchell Horn</span>
          <span className="footer-role">Data Systems &amp; AI Engineer · Boston University</span>
          <span className="footer-copy">© {year}</span>
        </div>

        <nav className="footer-nav" aria-label="More links">
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/mitchell-horn-92a279106/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/icons/linkedin.png" alt="LinkedIn" className="footer-icon" />
            </a>
            <a href="https://github.com/mitchellxh/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/icons/gh.png" alt="GitHub" className="footer-icon footer-icon--light" />
              <img src="/icons/gh-dark.png" alt="GitHub" className="footer-icon footer-icon--dark" />
            </a>
          </div>

          <div className="footer-linkrow">
            <a href="https://orcid.org/0000-0002-8249-5793" target="_blank" rel="noopener noreferrer">ORCID</a>
            <a href="https://scholar.google.com/citations?user=eBbRfewAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href="https://www.researchgate.net/profile/Mitchell-Horn" target="_blank" rel="noopener noreferrer">ResearchGate</a>
            <a href="https://yse-rc.github.io/" target="_blank" rel="noopener noreferrer">Resources</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
