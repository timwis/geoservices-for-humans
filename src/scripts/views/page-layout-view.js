import View from 'ampersand-view'

import EventBus from '../event-bus'
import FieldListView from './field-list-view'
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
  initialize: function () {
    this.listenTo(EventBus, 'filter', this.onFilter)
    this.listenTo(EventBus, 'fieldSelectionChange', this.onFieldSelectionChange)
  },
  onFilter: function (fieldModel, operator, value) {
    const filter = operator && value ? `${fieldModel.name} ${operator} ${value}` : ''
    this.model.query.setWhereFilter(fieldModel.name, filter)
  },
  onFieldSelectionChange: function (selectedFields) {
    this.model.query.setOutFields(selectedFields)
  },
  events: {
    'submit form': 'onSubmitForm'
  },
  onSubmitForm: function (e) {
    this.model.serviceUrl = this.queryByHook('service-url').value
    this.model.fetch()
    e.preventDefault()
  },
  subviews: {
    fieldList: {
      selector: '[data-hook=field-list]',
      prepareView: function () {
        return new FieldListView({model: this.model})
      }
    },
    preview: {
      selector: '[data-hook=preview]',
      prepareView: function () {
        return new QueryView({model: this.model.query})
      }
    }
  }
})

export default PageLayoutView
