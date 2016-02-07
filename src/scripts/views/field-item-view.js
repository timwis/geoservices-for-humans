import View from 'ampersand-view'
import $ from 'jquery'

import EventBus from '../event-bus'
import FieldItemTemplate from '../templates/field-item.html'

const FieldItemView = View.extend({
  template: FieldItemTemplate,
  props: {
    'sampleResult': 'object'
  },
  bindings: {
    'sampleResult': {
      'hook': 'sample-result',
      'type': (el, value, previousValue) => {
        if (value) el.innerText = JSON.stringify(value, null, 2)
      }
    },
    'model.sampleValue': [
      {
        type: 'text',
        hook: 'sample-value'
      },
      {
        type: 'attribute',
        name: 'placeholder',
        hook: 'filter-value'
      }
    ],
    'model.sampleUrl': [
      {
        type: 'text',
        hook: 'sample-url'
      },
      {
        type: 'attribute',
        name: 'href',
        hook: 'sample-url'
      }
    ]
  },
  events: {
    'click [data-toggle="collapse"]': 'onToggle',
    'click .sample-url a': 'onClickSampleUrl',
    'change [data-hook^=filter]': 'onChangeFilterValue'
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
  },
  onChangeFilterValue: function (e) {
    const operator = this.queryByHook('filter-operator').value
    const value = this.queryByHook('filter-value').value
    EventBus.trigger('filter', this.model, operator, value)
  }
})

export default FieldItemView
