import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.sass'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const aspectToClass = aspectRatio =>
  aspectRatio > 1.5 ? 'landscape' : aspectRatio < 0.8 ? 'portrait' : 'square'

const Gallery = ({ images }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  return (
    <>
      <div className="gallery">
        {images.map(({ image, text }, i) => (
          <div
            className={`item ${aspectToClass(
              image.childImageSharp.fluid.aspectRatio,
            )}`}
            onClick={() => {
              setOpen(true)
              setIndex(i)
            }}
          >
            <PreviewCompatibleImage imageInfo={{ image, alt: text }} />
          </div>
        ))}
      </div>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <img
            srcSet={images[index].image.childImageSharp.fluid.srcSet}
            onClick={e => {
              e.stopPropagation()
              setIndex(preIndex =>
                images.length - 1 > preIndex ? preIndex + 1 : preIndex,
              )
            }}
          />
        </div>
      )}
    </>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf({
    image: PropTypes.object.isRequired,
    text: PropTypes.string,
  }).isRequired,
}

export default Gallery
