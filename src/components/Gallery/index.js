import React from 'react'
import PropTypes from 'prop-types'

import './style.sass'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const aspectToClass = aspectRatio =>
  aspectRatio > 1.5 ? 'landscape' : aspectRatio < 0.8 ? 'portrait' : 'square'

const Gallery = ({ images }) => (
  <div className="gallery">
    {images.map(({ image, text }) => (
      <div
        className={`item ${aspectToClass(
          image.childImageSharp.fluid.aspectRatio,
        )}`}
      >
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
