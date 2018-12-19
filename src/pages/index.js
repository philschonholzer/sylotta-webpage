import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const IndexPage = ({ data }) => {
  console.log('data', data)
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        <Img fluid={data.hero.fluid} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            fontSize: '3em',
            color: 'white',
            textAlign: 'right',
          }}
        >
          <div className="container">
            <h1 style={{ marginBottom: 0 }}>SY Lotta</h1>
            <p style={{ marginTop: 0 }}>Mal sehen wo es uns hinspühlt...</p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="has-text-weight-bold is-size-2">Letzter Bericht</h2>
          {posts.map(({ node: post }) => (
            <div key={post.id}>
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                <HTMLContent content={post.html} />
              </p>
            </div>
          ))}
          <Link className="button is-small" to="trips">
            Weitere Berichte
          </Link>
        </div>
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
