import Model from 'ampersand-model'

import FieldCollection from '../collections/field-collection'

const LayerModel = Model.extend({
  session: {
    serviceUrl: 'string'
  },
  initialize: function (attr, opts) {
    opts = opts || {}
    this.serviceUrl = opts.serviceUrl
  },
  url: function () {
    return `${this.serviceUrl}?f=json`
  },
  collections: {
    fields: FieldCollection
  }
})

export default LayerModel
