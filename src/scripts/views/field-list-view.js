import View from 'ampersand-view'
import 'bootstrap/js/collapse'

import EventBus from '../event-bus'
import FieldItemView from './field-item-view'
import FieldListTemplate from '../templates/field-list.html'

const FieldListView = View.extend({
  template: FieldListTemplate,
  itemView: FieldItemView,
  events: {
    'change [data-hook=field-selected]': 'onChangeFieldSelected'
  },
  onChangeFieldSelected: function (e) {
    var selectedFields = this.queryAll('[data-hook=field-selected]:checked').map((el) => el.value)
    EventBus.trigger('fieldSelectionChange', selectedFields)
  },
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.queryByHook('field-items')
    this.renderCollection(this.model.fields, this.itemView, collectionContainer, opts)

    return this
  }
})

export default FieldListView
