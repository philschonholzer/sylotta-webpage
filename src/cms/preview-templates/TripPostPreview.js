import React from 'react'
import PropTypes from 'prop-types'
import { TripPostTemplate } from '../../templates/trip-post'

const TripPostPreview = ({ entry, widgetFor }) => (
  <TripPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
)

TripPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TripPostPreview
