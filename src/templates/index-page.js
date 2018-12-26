import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Position from '../components/Position'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.lasttrip
  const { title, tagline, intro, blog } = data.markdownRemark.frontmatter
  const { heading: introHeading, text: introText, image: introImage } = intro
  const { heading: blogHeading, text: blogText } = blog

  return (
    <Layout>
      <div className="hero-wrapper">
        <PreviewCompatibleImage imageInfo={data.markdownRemark.frontmatter} />
        <div className="hero-content">
          <div className="container">
            <p style={{ marginBottom: 0 }}>{tagline}</p>
            <h1 style={{ marginTop: 0 }}>{title}</h1>
          </div>
        </div>
      </div>
      <section className="even">
        <div className="container">
          <div className="row">
            <h2>{introHeading}</h2>
            <div>
              <p>{introText}</p>
              {introImage && (
                <PreviewCompatibleImage
                  imageInfo={introImage}
                  imageStyle={{ marginBottom: '1em' }}
                />
              )}
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
            <h2>{blogHeading}</h2>
            <div>
              <p>{blogText}</p>
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
  query IndexQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        tagline
        image {
          childImageSharp {
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        intro {
          heading
          text
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
        blog {
          heading
          text
        }
      }
    }
    lasttrip: allMarkdownRemark(
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
  }
`
