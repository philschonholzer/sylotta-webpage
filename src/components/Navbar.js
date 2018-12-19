import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => {
  return (
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
          <Link to="/trips">Reise</Link>
          <Link to="/about">Über uns</Link>
          <Link to="/contact">Kontakt</Link>
          <a
            href="http://wolfschon.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            className="navbar-item"
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
