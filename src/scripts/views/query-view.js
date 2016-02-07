import View from 'ampersand-view'
import $ from 'jquery'

import QueryTemplate from '../templates/query.html'

const QueryView = View.extend({
  template: QueryTemplate,
  props: {
    'queryResult': 'object'
  },
  bindings: {
    'model.outFields': '[data-hook=outFields]',
    'model.where': '[data-hook=where]',
    'model.groupByFieldsForStatistics': '[data-hook=groupByFieldsForStatistics]',
    'model.outStatistics': '[data-hook=outStatistics]',
    'model.queryUrl': [
      {
        type: 'text',
        hook: 'query-url'
      },
      {
        type: 'attribute',
        name: 'href',
        hook: 'query-url'
      }
    ],
    'queryResult': {
      'hook': 'query-result',
      'type': (el, value, previousValue) => {
        if (value) el.innerText = JSON.stringify(value, null, 2)
      }
    }
  },
  events: {
    'click [data-hook=query-url]': 'onClickQueryUrl'
  },
  onClickQueryUrl: function (e) {
    this.queryByHook('query-result').style.display = 'block'
    $.getJSON(this.model.queryUrl, (result) => this.queryResult = result)
    e.preventDefault()
  }
})

export default QueryView
