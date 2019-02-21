import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import './style.sass'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        gallery: allMarkdownRemark(
          limit: 1
          filter: { frontmatter: { templateKey: { regex: "/gallery/" } } }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={({ gallery }) => (
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
            <Link to="/about">Über uns</Link>
            <Link to="/trips">Reise</Link>
            <Link to="/contact">Kontakt</Link>
            <Link to={gallery.edges[0].node.fields.slug}>Galerie</Link>
            <a className="button" href="https://wolfschon.blogspot.com">
              Zum Blog &#8599;
            </a>
          </div>
        </div>
      </nav>
    )}
  />
)

export default Navbar
