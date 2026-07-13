import '../styles/Navbar.css';

/*
 * Navbar — deliberately spare: identity on the left, the two current
 * affiliations (BU · Yale) right-justified. Everything else (LinkedIn, GitHub,
 * publications, resources) lives in the footer.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-glass" aria-hidden="true"></div>
      <div className="navbar-content">
        <div className="nav-left">
          <img src="/logo.svg" alt="Mitchell Horn" className="nav-logo" />
        </div>

        <div className="social-links">
          <a href="https://www.bu.edu/cds-faculty/" target="_blank" rel="noopener noreferrer">
            <img src="/icons/bu.png" alt="BU Faculty of Computing & Data Sciences" className="social-icon" />
          </a>
          <a href="https://environment.yale.edu/directory/staff/mitchell-horn" target="_blank" rel="noopener noreferrer">
            <img src="/icons/yale.png" alt="Yale" className="social-icon" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
