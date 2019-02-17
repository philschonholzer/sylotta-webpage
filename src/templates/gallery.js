import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import GalleryCmp from '../components/Gallery'
import { HTMLContent } from '../components/Content'

import '../components/style/gallery.sass'
import SEO from '../components/SEO'

const GalleryPostTemplate = ({ post, next, prev }) => (
  <article id="gallery-page">
    <header>
      <div className="container">
        <h1>Gallerie</h1>
      </div>
    </header>
    <section>
      <div className="container">
        <h2>
          {post.frontmatter.title} <small>{post.frontmatter.date}</small>
        </h2>
        <HTMLContent content={post.html} />
        <div className="gallery-wrapper">
          <GalleryCmp
            images={post.frontmatter.images}
            mainImage={post.frontmatter.mainImage}
          />
        </div>
        <div className="page-navigation">
          <div>
            {prev && (
              <Link className="button" to={prev.fields.slug}>
                <svg className="prev-button" viewBox="-2 -2 40 68">
                  <line y2="32" x2="4" y1="4" x1="32" />
                  <line y2="32" x2="4" y1="60" x1="32" />
                </svg>
                {prev.frontmatter.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link className="button" to={next.fields.slug}>
                {next.frontmatter.title}
                <svg className="next-button" viewBox="-2 -2 40 68">
                  <line y2="32" x2="32" y1="4" x1="4" />
                  <line y2="32" x2="32" y1="60" x1="4" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  </article>
)

GalleryPostTemplate.propTypes = {
  post: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
}

const GalleryPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={
          post.frontmatter.mainImage.image &&
          post.frontmatter.mainImage.image.childImageSharp.resize.src
        }
      />

      <GalleryPostTemplate
        post={post}
        next={pageContext.next}
        prev={pageContext.prev}
      />
    </Layout>
  )
}

GalleryPost.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default GalleryPost

export const galleryPostQuery = graphql`
  query GalleryPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
        mainImage {
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
              resize(width: 1200, height: 630, cropFocus: ENTROPY) {
                src
              }
            }
          }
          text
        }
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
        date(formatString: "DD. MMMM YYYY")
      }
    }
  }
`
