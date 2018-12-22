import React from 'react'

import './style.sass'

const Footer = () => (
  <footer id="footer">
    <div className="container flex-space-between">
      <p>© 2019 - SY Lotta - Webseite von Wolfgang und Elisabeth </p>
      <a
        className="navbar-item"
        href="/admin"
        target="_blank"
        rel="noopener noreferrer"
      >
        Admin
      </a>
    </div>
  </footer>
)

export default Footer
