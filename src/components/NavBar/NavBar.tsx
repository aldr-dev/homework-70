import './NavBar.css';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="header-logo" to="/">Contacts</Link>
        <Link className="header-contact-button" to="/new-contact">Add new contact</Link>
      </div>
    </header>
  );
};

export default NavBar;