import View from 'ampersand-view'

import EventBus from '../event-bus'
import FieldPanelItemTemplate from '../templates/field-panel-item.html'

const FieldPanelItemView = View.extend({
  template: FieldPanelItemTemplate,
  bindings: {
    'model.sampleValue': {
      type: 'attribute',
      name: 'placeholder',
      hook: 'filter-value'
    }
  },
  events: {
    'click [data-toggle="collapse"]': 'onToggle',
    'change [data-hook=filter-operator]': 'onChangeFilterValue',
    'change [data-hook=filter-value]': 'onChangeFilterValue'
  },
  onToggle: function (e) {
    if (!this.model.sampleValue) {
      this.model.getSampleValue().then((sampleValue) => this.model.sampleValue = sampleValue)
    }
    e.preventDefault()
  },
  onChangeFilterValue: function (e) {
    const operator = this.queryByHook('filter-operator').value
    const value = this.queryByHook('filter-value').value
    EventBus.trigger('filter', this.model, operator, value)
  }
})

export default FieldPanelItemView
