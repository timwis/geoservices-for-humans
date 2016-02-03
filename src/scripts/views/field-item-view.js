import View from 'ampersand-view'

import FieldItemTemplate from '../templates/field-item.html'

const FieldItemView = View.extend({
  template: FieldItemTemplate,
  events: {
    'click [data-toggle="collapse"]': 'onToggle'
  },
  props: {
    'sampleUrl': 'string'
  },
  bindings: {
    'model.sampleValue': '.sample-value',
    'model.sampleUrl': [
      {
        type: 'text',
        selector: '.sample-url a'
      },
      {
        type: 'attribute',
        name: 'href',
        selector: '.sample-url a'
      }
    ]
  },
  onToggle: function (e) {
    this.model.getSampleValue().then((sampleValue) => this.model.sampleValue = sampleValue)
    e.preventDefault()
  }
})

export default FieldItemView
