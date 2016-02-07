import View from 'ampersand-view'

import QueryTemplate from '../templates/query.html'

const QueryView = View.extend({
  template: QueryTemplate,
  bindings: {
    'model.outFields': '[data-hook=outFields]',
    'model.where': '[data-hook=where]'
  }
})

export default QueryView
