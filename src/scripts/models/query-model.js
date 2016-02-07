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
    // outFieldsString: {
    //   deps: ['outFields'],
    //   fn: function () {
    //     // If outFields hasn't been defined yet or it's the same number of fields as the parent's fields collection
    //     // TODO: this is pretty tight coupling... any better approach?
    //     if (!this.outFields || this.outFields.length === this.parent.fields.length) {
    //       return '*'
    //     } else {
    //       return this.outFields.join(', ')
    //     }
    //   }
    // },
    // whereString: {
    //   deps: ['where'],
    //   fn: function () {
    //     return isEmpty(this.where) ? '1=1' : values(this.where).join(' AND ')
    //   }
    // }
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
