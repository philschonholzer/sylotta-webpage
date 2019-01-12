import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './style/all.sass'
import Navbar from './Navbar'
import Footer from './Footer'

const TemplateWrapper = ({ children }) => (
  <>
    <Helmet>
      <html lang="de" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/img/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/img/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/img/favicon-16x16.png"
        sizes="16x16"
      />

      <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
      <meta name="theme-color" content="#fff" />
    </Helmet>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
)

export default TemplateWrapper

TemplateWrapper.propTypes = {
  children: PropTypes.node,
}
