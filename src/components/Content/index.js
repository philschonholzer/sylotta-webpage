import React from 'react'
import PropTypes from 'prop-types'

import './style.sass'

export const HTMLContent = ({ content, className }) => (
  <div
    className={`markdown-content ${className}`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

const Content = ({ content, className }) => (
  <div className={`markdown-content ${className}`}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
