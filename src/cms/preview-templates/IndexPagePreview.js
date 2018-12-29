import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => (
  <IndexPageTemplate
    title={entry.getIn(['data', 'title'])}
    image={getAsset(entry.getIn(['data', 'image']))}
    tagline={entry.getIn(['data', 'tagline'])}
    intro={{
      heading: entry.getIn(['data', 'intro', 'heading']),
      text: entry.getIn(['data', 'intro', 'text']),
      image: {
        image: getAsset(entry.getIn(['data', 'intro', 'image', 'image'])),
        alt: entry.getIn(['data', 'intro', 'image', 'alt']),
      },
    }}
    blog={{
      heading: entry.getIn(['data', 'blog', 'heading']),
      text: entry.getIn(['data', 'blog', 'text']),
    }}
    lasttrip={{ edges: [] }}
  />
)

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
