import React from 'react'
import PropTypes from 'prop-types'

import './style.sass'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const Gallery = ({ images }) => (
  <div className="gallery">
    {images.map(({ image, text }) => (
      <div className="item">
        <PreviewCompatibleImage imageInfo={{ image, alt: text }} />
      </div>
    ))}
  </div>
)

Gallery.propTypes = {
  images: PropTypes.arrayOf({
    image: PropTypes.object.isRequired,
    text: PropTypes.string,
  }).isRequired,
}

export default Gallery
