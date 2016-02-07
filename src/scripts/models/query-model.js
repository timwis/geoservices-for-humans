import State from 'ampersand-state'
import {isEmpty, values, clone} from 'lodash'

const QueryModel = State.extend({
  props: {
    outFields: ['string', true, '*'],
    where: ['string', true, '1=1']
  },
  session: {
    whereFilters: ['object', false, function () { return {} }]
  },
  derived: {
    totalFields: {
      deps: ['parent.fields'],
      fn: function () {
        return this.parent.fields.length
      }
    }
  },
  setOutFields: function (fields) {
    this.outFields = !fields || fields.length === this.totalFields ? '*' : fields.join(', ')
  },
  setWhereFilter: function (field, filter) {
    if (filter) {
      this.whereFilters[field] = filter
    } else {
      delete this.whereFilters[field]
    }
    this.where = isEmpty(this.whereFilters) ? '1=1' : values(this.whereFilters).join(' AND ')
  }
})

export default QueryModel
