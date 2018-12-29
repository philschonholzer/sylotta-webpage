import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Position from '../components/Position'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndexPageTemplate = ({
  title,
  tagline,
  image,
  intro,
  blog,
  lasttrip,
}) => {
  const { edges: posts } = lasttrip
  const { heading: introHeading, text: introText, image: introImage } = intro
  const { heading: blogHeading, text: blogText } = blog

  return (
    <Layout>
      <div className="hero-wrapper">
        <PreviewCompatibleImage imageInfo={{ image }} />
        <div className="hero-content">
          <div className="container">
            <p style={{ marginBottom: 0 }}>{tagline}</p>
            <h1 style={{ marginTop: 0 }}>{title}</h1>
          </div>
        </div>
      </div>
      <section className="even">
        <div className="container split-col">
          <div>
            <h2>{introHeading}</h2>
            <p>{introText}</p>
            <Link className="button" to="about">
              Mehr
            </Link>
          </div>
          {introImage && (
            <PreviewCompatibleImage
              imageInfo={introImage}
              imageStyle={{ marginBottom: '1em' }}
            />
          )}
        </div>
      </section>
      <section id="position" className="even">
        <div className="container split-col">
          <div>
            <h2>{blogHeading}</h2>
            <div>
              <p>{blogText}</p>
              <a className="button" href="https://wolfschon.blogspot.com">
                Zum Blog
              </a>
            </div>
          </div>
          <div>
            <h2>Aktuelle Position</h2>
            <Position />
          </div>
        </div>
      </section>
      <section className="even">
        {posts.map(({ node: post }) => (
          <div className="container split-col" key={post.id}>
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
              <p>{post.excerpt}</p>
              <Link className="button is-small" to="trips">
                Weiter
              </Link>
            </div>
            <div>
              <PreviewCompatibleImage imageInfo={post.frontmatter} />
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  tagline: PropTypes.string.isRequired,
  intro: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  lasttrip: PropTypes.object.isRequired,
}

const IndexPage = ({ data }) => {
  const { lasttrip } = data

  return (
    <IndexPageTemplate
      lasttrip={lasttrip}
      {...data.markdownRemark.frontmatter}
    />
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
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
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
            date(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
  }
`
