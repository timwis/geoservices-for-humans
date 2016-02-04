import View from 'ampersand-view'

import LayerModel from '../models/layer-model'
import FieldListView from './field-list-view'
import FieldContainerTemplate from '../templates/field-container.html'

const FieldContainerView = View.extend({
  template: FieldContainerTemplate,
  props: {
    serviceUrl: 'string'
  },
  events: {
    'submit form': 'onSubmitForm'
  },
  bindings: {
    'serviceUrl': {
      type: 'value',
      hook: 'service-url'
    }
  },
  onSubmitForm: function (e) {
    e.preventDefault()
    this.serviceUrl = this.queryByHook('service-url').value
    this.render()
    e.preventDefault()
  },
  render: function () {
    this.renderWithTemplate()

    const layer = new LayerModel(null, {serviceUrl: this.serviceUrl})
    layer.fetch()

    const fieldListView = new FieldListView({model: layer})
    const fieldListContainer = this.queryByHook('field-list')
    this.renderSubview(fieldListView, fieldListContainer)

    return this
  }
})

export default FieldContainerView
