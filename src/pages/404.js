import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div className="container">
      <section>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite existiert leider (nicht) mehr...</p>
        <Link className="button" to="/">
          Zur Startseite
        </Link>
      </section>
    </div>
  </Layout>
)

export default NotFoundPage
