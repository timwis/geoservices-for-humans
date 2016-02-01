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
    'sampleUrl': [
      {
        type: 'text',
        selector: '.sample-url a'
      },
      {
        type: 'attribute',
        name: 'href',
        selector: '.sample-url a'
      }
    ],
    'model.sampleValue': { // TODO: Not sure which of these 2 approaches is best
      selector: '.sample-value',
      type: function (el, value, previousValue) {
        value.then((sampleValue) => el.innerHTML = this.model.enclose(sampleValue, this.model.friendlyType))
      }
    }
  },
  onToggle: function (e) {
    // const isShown = !this.el.querySelector('.collapse').className.includes('in')
    this.model.sampleUrl.then((sampleUrl) => this.sampleUrl = sampleUrl)
    e.preventDefault()
  }
})

export default FieldItemView
