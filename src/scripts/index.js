import State from 'ampersand-state'
import Model from 'ampersand-model'
import Collection from 'ampersand-collection'
import View from 'ampersand-view'
import 'bootstrap/js/collapse'

import FieldItemTemplate from '../templates/field-item.html'
import FieldListTemplate from '../templates/field-list.html'

const FieldModel = State.extend({
  props: {
    name: 'string',
    type: 'string'
  }
})

const FieldCollection = Collection.extend({
  model: FieldModel
})

const LayerModel = Model.extend({
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

const FieldItemView = View.extend({
  template: FieldItemTemplate
})

const FieldListView = View.extend({
  template: FieldListTemplate,
  itemView: FieldItemView,
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.el.querySelector('#accordion')
    this.renderCollection(this.model.fields, this.itemView, collectionContainer, opts)

    return this
  }
})

const defaultServiceUrl = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Incidents_2006/FeatureServer/0'
const layer = new LayerModel(null, {serviceUrl: defaultServiceUrl})
layer.fetch()

const fieldListView = new FieldListView({model: layer})
document.querySelector('#fields').appendChild(fieldListView.render().el)
