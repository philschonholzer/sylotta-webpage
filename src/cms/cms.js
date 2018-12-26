import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import TripPostPreview from './preview-templates/TripPostPreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('trip', TripPostPreview)
