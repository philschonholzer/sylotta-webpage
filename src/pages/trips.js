import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const TripPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <header>
        <div className="container">
          <h1 className="has-text-weight-bold is-size-2">Segelfahrten</h1>
        </div>
      </header>
      {posts.map(({ node: post }) => (
        <section className="even" key={post.id}>
          <div className="container">
            <div className="row">
              <p>
                <h2 style={{ marginBottom: 0 }}>{post.frontmatter.title}</h2>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                <HTMLContent content={post.html} />
              </p>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  )
}

TripPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default TripPage

export const pageQuery = graphql`
  query TripQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "trip-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
