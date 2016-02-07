import View from 'ampersand-view'
import 'bootstrap/js/tab'

import EventBus from '../event-bus'
import AggregationTemplate from '../templates/aggregation.html'

const aggregationFunctions = ['COUNT', 'SUM', 'AVG', 'VAR', 'MAX', 'MIN']

const AggregationView = View.extend({
  template: AggregationTemplate,
  initialize: function () {
    this.listenTo(this.model.fields, 'sort', this.render)
  },
  render: function () {
    const templateData = {
      fields: this.model.fields.toJSON(),
      aggregationFunctions: aggregationFunctions
    }
    this.renderWithTemplate(templateData)
    return this
  },
  events: {
    'change [data-hook=group-by]': 'onChangeGroupBy',
    'change [data-hook=aggregation-function]': 'onChangeAggregation',
    'change [data-hook=aggregation-field]': 'onChangeAggregation'
  },
  onChangeGroupBy: function (e) {
    const value = this.queryByHook('group-by').value
    EventBus.trigger('changeGroupBy', value)
  },
  onChangeAggregation: function (e) {
    console.log('triggering onChangeAggregation')
    const aggregationFunction = this.queryByHook('aggregation-function').value
    const aggregationField = this.queryByHook('aggregation-field').value
    EventBus.trigger('changeAggregation', aggregationFunction, aggregationField)
  }
})

export default AggregationView
