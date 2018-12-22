import React from 'react'
import { Link } from 'gatsby'

import './style.sass'

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main-navigation">
    <div className="container nav-container">
      <div>
        <Link to="/" data-element="logo">
          SY Lotta
        </Link>
      </div>

      <div className="menu-button" tabIndex="0" role="menuitem">
        Menu
      </div>
      <div className="menu">
        <Link to="/trips">Segelfahrten</Link>
        <Link to="/about">Über uns</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
    </div>
  </nav>
)

export default Navbar
