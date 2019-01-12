import React from 'react'
import Helmet from 'react-helmet'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const getSchemaOrgJSONLD = ({ url, title, alternateName }) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName,
    },
  ]

  return schemaOrgJSONLD
}

const SEO = ({ title: titlePage, description: descPage, image: imagePage }) => (
  <Location>
    {({ location }) => (
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            site {
              siteMetadata {
                title
                description
                url
                image
              }
            }
          }
        `}
        render={({ site: { siteMetadata: config } }) => {
          const title = titlePage || config.title
          const description = descPage || config.description
          const image = imagePage ? `${config.url}${imagePage}` : config.image
          const url = `${config.url}${location.pathname}`

          const schemaOrgJSONLD = getSchemaOrgJSONLD({
            url,
            title,
            alternateName: config.title,
          })

          return (
            <Helmet>
              {/* General tags */}
              <meta name="description" content={description} />
              <meta name="image" content={image} />

              {/* Schema.org tags */}
              <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
              </script>

              {/* OpenGraph tags */}
              <meta property="og:url" content={url} />
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={image} />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />

              {/* Twitter Card tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:creator" content={config.twitter} />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={image} />
            </Helmet>
          )
        }}
      />
    )}
  </Location>
)

SEO.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  description: PropTypes.string,
}

export default SEO
