import Model from 'ampersand-model'

import QueryModel from './query-model'
import FieldCollection from '../collections/field-collection'

const LayerModel = Model.extend({
  session: {
    serviceUrl: 'string',
    query: 'state'
  },
  initialize: function (attr, opts) {
    opts = opts || {}
    this.serviceUrl = opts.serviceUrl
    this.query = new QueryModel(null, {parent: this})
  },
  url: function () {
    return `${this.serviceUrl}?f=json`
  },
  collections: {
    fields: FieldCollection
  }
})

export default LayerModel
