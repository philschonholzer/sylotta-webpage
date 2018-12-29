import React from 'react'
import PropTypes from 'prop-types'
import { TripPostTemplate } from '../../templates/trip-post'

const TripPostPreview = ({ entry, widgetFor }) => (
  <TripPostTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    image={entry.getIn(['data', 'image'])}
  />
)

TripPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TripPostPreview
