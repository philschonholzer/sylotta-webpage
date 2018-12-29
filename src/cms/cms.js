import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import TripPostPreview from './preview-templates/TripPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('trip', TripPostPreview)
CMS.registerPreviewTemplate('index', IndexPagePreview)
