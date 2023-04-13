import { Link } from 'react-router-dom';

import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">WONRIAL</a>
      </div>

      <nav className="header__nav" role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
