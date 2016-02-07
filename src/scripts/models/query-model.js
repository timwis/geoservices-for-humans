import State from 'ampersand-state'
import {isEmpty, values} from 'lodash'
import $ from 'jquery'

const QueryModel = State.extend({
  props: {
    outFields: ['string', true, '*'],
    where: ['string', true, '1=1'],
    groupByFieldsForStatistics: 'string',
    outStatistics: 'string',
    f: ['string', true, 'json']
  },
  session: {
    serviceUrl: 'string',
    whereFilters: ['object', false, function () { return {} }]
  },
  derived: {
    queryUrl: {
      deps: ['serviceUrl', 'outFields', 'where', 'groupByFieldsForStatistics', 'outStatistics'],
      fn: function () {
        const params = $.param(this.serialize())
        return `${this.serviceUrl}/query?${params}`
      }
    }
  },
  initialize: function (attr, opts) {
    opts = opts || {}
    this.serviceUrl = opts.serviceUrl
  },
  setOutFields: function (fields) {
    this.outFields = !fields.length ? '*' : fields.join(', ')
  },
  setWhereFilter: function (field, filter) {
    if (filter) {
      this.whereFilters[field] = filter
    } else {
      delete this.whereFilters[field]
    }
    this.where = isEmpty(this.whereFilters) ? '1=1' : values(this.whereFilters).join(' AND ')
  },
  setGroupBy: function (groupBy) {
    this.groupByFieldsForStatistics = groupBy
  },
  setAggregation: function (aggregationFunction, aggregationField) {
    this.outStatistics = aggregationFunction && aggregationField ? JSON.stringify([{
      statisticType: aggregationFunction,
      onStatisticField: aggregationField,
      outStatisticFieldName: `${aggregationField}_${aggregationFunction}`
    }]) : ''
  }
})

export default QueryModel
