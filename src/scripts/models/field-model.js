import State from 'ampersand-state'
import $ from 'jquery'

const FieldModel = State.extend({
  props: {
    name: 'string',
    type: 'string'
  },
  session: {
    sampleValue: 'any'
  },
  derived: {
    friendlyType: {
      deps: ['type'],
      fn: function () {
        return this.typeMap[this.type] || this.type
      }
    },
    serviceUrl: {
      fn: function () {
        return this.collection.parent.serviceUrl
      }
    },
    sampleUrl: {
      deps: ['sampleValue', 'name', 'friendlyType', 'serviceUrl'],
      fn: function () {
        if (!this.sampleValue) return

        const sampleQuery = {
          where: `${this.name} = ${this.enclose(this.sampleValue, this.friendlyType)}`,
          f: 'json',
          outFields: '*'
        }
        const sampleQueryString = $.param(sampleQuery)

        return `${this.serviceUrl}/query?${sampleQueryString}`
      }
    }
  },
  typeMap: {
    esriFieldTypeString: 'string',
    esriFieldTypeDate: 'date',
    esriFieldTypeSmallInteger: 'integer',
    esriFieldTypeOID: 'objectid',
    esriFieldTypeGlobalID: 'globalid',
    esriFieldTypeGeometry: 'geometry',
    esriFieldTypeDouble: 'double'
  },
  getSampleValue: function () {
    return $.ajax({
      url: this.serviceUrl + '/query',
      dataType: 'json',
      data: {
        f: 'json',
        outFields: this.name,
        where: `${this.name} IS NOT NULL`,
        resultRecordCount: 1
      }
    }).then((response) => response.features.length && response.features[0].attributes[this.name])
  },
  enclose: function (value, friendlyType) {
    var nonQuotedTypes = ['integer', 'objectid', 'double']
    return nonQuotedTypes.includes(friendlyType) ? value : `'${value}'`
  }
})

export default FieldModel
