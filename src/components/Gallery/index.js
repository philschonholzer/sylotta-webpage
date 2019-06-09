import React, { useState } from 'react'
import useKey from 'use-key-hook'
import PropTypes from 'prop-types'

import './style.sass'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const aspectToClass = aspectRatio =>
  aspectRatio > 1.5 ? 'landscape' : aspectRatio < 0.8 ? 'portrait' : 'square'

const Gallery = ({ images, mainImage }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const mergedImages = [mainImage, ...images].filter(i => i.image)

  const openModal = i => () => {
    setOpen(true)
    setIndex(i)
  }

  const nextModalImage = e => {
    e.stopPropagation()
    setIndex(preIndex =>
      mergedImages.length - 1 > preIndex ? preIndex + 1 : preIndex,
    )
  }

  const prevModalImage = e => {
    e.stopPropagation()
    setIndex(preIndex => (preIndex > 0 ? preIndex - 1 : preIndex))
  }

  if (typeof window !== 'undefined') {
    useKey(
      pressedKey => {
        switch (pressedKey) {
          case 27:
            setOpen(false)
            break
          case 37:
            prevModalImage({ stopPropagation: () => null })
            break
          case 39:
            nextModalImage({ stopPropagation: () => null })
            break
          default:
        }
      },
      {
        detectKeys: [27, 37, 39],
      },
    )
  }
  return (
    <>
      <div className="gallery">
        {mergedImages.map(({ image, text }, i) => (
          <button
            type="button"
            key={image.childImageSharp.fluid.src}
            className={`item ${aspectToClass(
              image.childImageSharp.fluid.aspectRatio,
            )}`}
            onClick={openModal(i)}
          >
            <PreviewCompatibleImage
              imageInfo={{
                childImageSharp: image.preview,
                alt: text,
              }}
            />
            <p className="image-overlay">{text}</p>
          </button>
        ))}
      </div>
      {open && (
        <div
          role="button"
          tabIndex="0"
          className="modal"
          onClick={nextModalImage}
          onKeyUp={nextModalImage}
        >
          <PreviewCompatibleImage
            imageInfo={{
              image: mergedImages[index].image,
              alt: mergedImages[index].text,
            }}
          />
          <p className="picture-text">{mergedImages[index].text}</p>
          <svg
            className={`next-button ${
              mergedImages.length - 1 <= index ? 'invisible' : ''
            }`}
            width="36"
            height="64"
          >
            <line y2="32" x2="32" y1="4" x1="4" />
            <line y2="32" x2="32" y1="60" x1="4" />
          </svg>
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
