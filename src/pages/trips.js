import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

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
            <div className="heading-col">
              <div>
                <h2 style={{ marginBottom: 0 }}>{post.frontmatter.title}</h2>
                <small>{post.frontmatter.date}</small>
              </div>
              <div>
                <HTMLContent content={post.html} />
                {post.frontmatter.image && (
                  <PreviewCompatibleImage imageInfo={post.frontmatter} />
                )}
              </div>
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
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
