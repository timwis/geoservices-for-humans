import View from 'ampersand-view'

import FieldListView from './field-list-view'
import QueryView from './query-view'
import PageLayoutTemplate from '../templates/page-layout.html'

const PageLayoutView = View.extend({
  template: PageLayoutTemplate,
  props: {
    serviceUrl: 'string'
  },
  events: {
    'submit form': 'onSubmitForm'
  },
  bindings: {
    'model.serviceUrl': {
      type: 'value',
      hook: 'service-url'
    }
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
