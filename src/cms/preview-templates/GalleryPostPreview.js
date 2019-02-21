import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'

const GalleryPostPreview = ({ entry, widgetFor, getAsset }) => {
  const entryImages = entry.getIn(['data', 'images'])
  const images = entryImages ? entryImages.toJS() : []

  const mainImage = {
    image: getAsset(entry.getIn(['data', 'mainImage', 'image'])),
    alt: entry.getIn(['data', 'mainImage', 'text']),
  }

  console.log(
    'date',
    entry
      .getIn(['data', 'date'])
      .toJSON()
      .slice(0, 10),
  )

  console.log('body', widgetFor('body').props.value)

  return (
    <article id="gallery-page">
      <header>
        <div className="container">
          <h1>Galerie</h1>
        </div>
      </header>
      <section>
        <div className="container">
          <h2>
            {entry.getIn(['data', 'title'])}{' '}
            <small>{`Von ${entry
              .getIn(['data', 'date'])
              .toJSON()
              .slice(0, 10)}`}</small>
          </h2>
          {widgetFor('body')}
          <div className="gallery-wrapper">
            <div className="gallery">
              {[mainImage, ...images]
                .filter(i => i.image)
                .map(({ image, text }) => (
                  <div key={image.id} className="item landscape">
                    <PreviewCompatibleImage
                      imageInfo={{ image, alt: text }}
                      imageStyle={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <p className="image-overlay">{text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

GalleryPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default GalleryPostPreview
