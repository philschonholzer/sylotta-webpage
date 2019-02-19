import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.sass'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const aspectToClass = aspectRatio =>
  aspectRatio > 1.5 ? 'landscape' : aspectRatio < 0.8 ? 'portrait' : 'square'

const Gallery = ({ images, mainImage }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const mergedImages = [mainImage, ...images].filter(i => i.image)

  return (
    <>
      <div className="gallery">
        {mergedImages.map(({ image, text }, i) => (
          <div
            key={i}
            className={`item ${aspectToClass(
              image.childImageSharp.fluid.aspectRatio,
            )}`}
            onClick={() => {
              setOpen(true)
              setIndex(i)
            }}
          >
            <PreviewCompatibleImage imageInfo={{ image, alt: text }} />
            <p className="image-overlay">{text}</p>
          </div>
        ))}
      </div>
      {open && (
        <div className="modal">
          <svg
            onClick={() => setOpen(false)}
            className="close-button"
            width="32"
            height="32"
          >
            <line y2="30" x2="30" y1="2" x1="2" />
            <line
              transform="rotate(90, 16, 16)"
              y2="30"
              x2="30"
              y1="2"
              x1="2"
            />
          </svg>
          <img
            srcSet={mergedImages[index].image.childImageSharp.fluid.srcSet}
            onClick={e => {
              e.stopPropagation()
              setIndex(preIndex =>
                mergedImages.length - 1 > preIndex ? preIndex + 1 : preIndex,
              )
            }}
          />
          <p className="picture-text">{mergedImages[index].text}</p>
          <svg
            onClick={e => {
              e.stopPropagation()
              setIndex(preIndex =>
                mergedImages.length - 1 > preIndex ? preIndex + 1 : preIndex,
              )
            }}
            className={`next-button ${
              mergedImages.length - 1 <= index ? 'invisible' : ''
            }`}
            width="36"
            height="64"
          >
            <line y2="32" x2="32" y1="4" x1="4" />
            <line y2="32" x2="32" y1="60" x1="4" />
          </svg>
        </div>
      )}
    </>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
  mainImage: PropTypes.shape({
    image: PropTypes.object.isRequired,
    text: PropTypes.string,
  }).isRequired,
}

export default Gallery
