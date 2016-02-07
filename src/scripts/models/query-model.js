import Model from 'ampersand-model'

const QueryModel = Model.extend({
  props: {
    // outFields: ['string', true, '*'],
    where: ['string', true, '1=1']
  },
  session: {
    selectedFields: 'array'
  },
  derived: {
    outFields: {
      deps: ['selectedFields'],
      fn: function () {
        // If selectedFields hasn't been defined yet or it's the same number of fields as the parent's fields collection
        // TODO: this is pretty tight coupling... any better approach?
        if (!this.selectedFields || this.selectedFields.length === this.parent.fields.length) {
          return '*'
        } else {
          return this.selectedFields.join(', ')
        }
      }
    }
  }
})

export default QueryModel
