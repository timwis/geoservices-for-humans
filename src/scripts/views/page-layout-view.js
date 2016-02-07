import View from 'ampersand-view'

import EventBus from '../event-bus'
// import FieldListView from './field-list-view'
import TabsView from './tabs-view'
import QueryView from './query-view'
import PageLayoutTemplate from '../templates/page-layout.html'

const PageLayoutView = View.extend({
  template: PageLayoutTemplate,
  props: {
    serviceUrl: 'string'
  },
  bindings: {
    'model.serviceUrl': {
      type: 'value',
      hook: 'service-url'
    }
  },
  initialize: function (opts) {
    opts = opts || {}
    this.queryModel = opts.queryModel
    this.listenTo(EventBus, 'filter', this.onFilter)
    this.listenTo(EventBus, 'changeFieldSelection', this.onChangeFieldSelection)
    this.listenTo(EventBus, 'changeGroupBy', this.onChangeGroupBy)
    this.listenTo(EventBus, 'changeAggregation', this.onChangeAggregation)
  },
  onFilter: function (fieldModel, operator, value) {
    const filter = operator && value ? `${fieldModel.name} ${operator} ${value}` : ''
    this.queryModel.setWhereFilter(fieldModel.name, filter)
  },
  onChangeFieldSelection: function (selectedFields) {
    this.queryModel.setOutFields(selectedFields)
  },
  onChangeGroupBy: function (groupBy) {
    this.queryModel.setGroupBy(groupBy)
  },
  onChangeAggregation: function (aggregationFunction, aggregationField) {
    this.queryModel.setAggregation(aggregationFunction, aggregationField)
  },
  events: {
    'submit form': 'onSubmitForm'
  },
  onSubmitForm: function (e) {
    this.model.serviceUrl = this.queryModel.serviceUrl = this.queryByHook('service-url').value
    this.model.fetch()
    e.preventDefault()
  },
  subviews: {
    tabs: {
      selector: '[data-hook=tabs]',
      prepareView: function () {
        return new TabsView({model: this.model})
      }
    },
    // fieldList: {
    //   selector: '[data-hook=field-list]',
    //   prepareView: function () {
    //     return new FieldListView({model: this.model})
    //   }
    // },
    preview: {
      selector: '[data-hook=preview]',
      prepareView: function () {
        return new QueryView({model: this.queryModel})
      }
    }
  }
})

export default PageLayoutView
