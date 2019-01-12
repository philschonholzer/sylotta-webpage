import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SEO from '../components/SEO'

export const TripPostTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              {image && <PreviewCompatibleImage imageInfo={image} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

TripPostTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const TripPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.excerpt}
        image={
          post.frontmatter.image &&
          post.frontmatter.image.childImageSharp.resize.src
        }
      />

      <TripPostTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  )
}

TripPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TripPost

export const tripPostQuery = graphql`
  query TripPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
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
      }
    }
  }
`
