import React from 'react';
import './NavBar.css';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink className="header-logo" to="/">Contacts</NavLink>
        <NavLink className="header-contact-button" to="/new-contact">Add new contact</NavLink>
      </div>
    </header>
  );
};

export default NavBar;