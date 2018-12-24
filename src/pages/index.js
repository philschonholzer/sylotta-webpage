import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Position from '../components/Position'

const IndexPage = ({ data }) => {
  console.log('data', data)
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <div className="hero-wrapper">
        <Img fluid={data.hero.fluid} />
        <div className="hero-content">
          <div className="container">
            <p style={{ marginBottom: 0 }}>Mal sehen wo es uns hinspühlt...</p>
            <h1 style={{ marginTop: 0 }}>SY Lotta</h1>
          </div>
        </div>
      </div>
      <section className="even">
        <div className="container">
          <div className="row">
            <h2>Unsere Reise</h2>
            <div>
              <p>
                Wir sind seid dem 30. April 2016 mit unserem Segelschiff Lotta
                auf den Weltmeeren unterwegs.
              </p>
              <Link className="button" to="about">
                Mehr
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="even">
        <div className="container">
          <div className="row">
            <h2>Blog</h2>
            <div>
              <p>
                In unserem Blog findet ihr regelmässig neue Berichte über unsere
                Reise.
              </p>
              <a className="button" href="https://wolfschon.blogspot.com">
                Zum Blog
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="even">
        <div className="container">
          <div className="row">
            <h2>Aktuelle Position</h2>
            <div>
              <Position />
            </div>
          </div>
        </div>
      </section>
      <section className="even">
        {posts.map(({ node: post }) => (
          <div className="container row" key={post.id}>
            <div>
              <h2 className="has-text-weight-bold is-size-2">
                Letzte Segelfahrten
              </h2>
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
            </div>
            <div key={post.id}>
              <HTMLContent content={post.html} />
              <Link className="button is-small" to="trips">
                Alle Segelfahrten
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 1
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "trip-post" } } }
    ) {
      edges {
        node {
          html
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
    hero: imageSharp(fluid: { originalName: { regex: "/hero/" } }) {
      fluid(maxWidth: 2400) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`
