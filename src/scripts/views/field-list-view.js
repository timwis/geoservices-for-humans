import View from 'ampersand-view'
import 'bootstrap/js/collapse'

import FieldItemView from './field-item-view'
import FieldListTemplate from '../templates/field-list.html'

const FieldListView = View.extend({
  template: FieldListTemplate,
  itemView: FieldItemView,
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.queryByHook('field-items')
    this.renderCollection(this.model.fields, this.itemView, collectionContainer, opts)

    return this
  }
})

export default FieldListView
