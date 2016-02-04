import View from 'ampersand-view'
import $ from 'jquery'

import FieldItemTemplate from '../templates/field-item.html'

const FieldItemView = View.extend({
  template: FieldItemTemplate,
  events: {
    'click [data-toggle="collapse"]': 'onToggle',
    'click .sample-url a': 'onClickSampleUrl'
  },
  props: {
    'sampleResult': 'object'
  },
  bindings: {
    'sampleResult': {
      'selector': '.sample-result',
      'type': (el, value, previousValue) => {
        if (value) el.innerText = JSON.stringify(value, null, 2)
      }
    },
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
    if (!this.model.sampleValue) {
      this.model.getSampleValue().then((sampleValue) => this.model.sampleValue = sampleValue)
    }
    e.preventDefault()
  },
  onClickSampleUrl: function (e) {
    this.queryByHook('sample-result').style.display = 'block'
    $.getJSON(this.model.sampleUrl, (result) => this.sampleResult = result)
    e.preventDefault()
  }
})

export default FieldItemView
