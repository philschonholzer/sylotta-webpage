import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import GalleryCmp from '../components/Gallery'
import { HTMLContent } from '../components/Content'

const Gallery = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <>
      <header>
        <div className="container">
          <h1>Gallery</h1>
        </div>
      </header>
      {edges.map(({ node }) => {
        const { title, images, date } = node.frontmatter
        return (
          <section>
            <div key={node.id} className="container">
              <h2>{title}</h2>
              <HTMLContent content={node.html} />
              <GalleryCmp images={images} />
            </div>
          </section>
        )
      })}
    </>
  </Layout>
)

Gallery.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default Gallery

export const pageQuery = graphql`
  query GalleryQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "gallery" } } }
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
            images {
              image {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              text
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
