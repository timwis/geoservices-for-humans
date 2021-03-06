import View from 'ampersand-view'
import 'bootstrap/js/collapse'

import EventBus from '../event-bus'
import FieldPanelItemView from './field-panel-item-view'
import FieldPanelTemplate from '../templates/field-panel.html'

const FieldPanelView = View.extend({
  template: FieldPanelTemplate,
  itemView: FieldPanelItemView,
  events: {
    'change [data-hook=field-selected]': 'onChangeFieldSelected'
  },
  onChangeFieldSelected: function (e) {
    let selectedFields = []
    const allFieldsAreSelected = !this.queryAll('[data-hook=field-selected]:not(:checked)').length

    if (!allFieldsAreSelected) {
      selectedFields = this.queryAll('[data-hook=field-selected]:checked').map((el) => el.value)
    }
    EventBus.trigger('changeFieldSelection', selectedFields)
  },
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.queryByHook('field-items')
    this.renderCollection(this.model.fields, this.itemView, collectionContainer, opts)

    return this
  }
})

export default FieldPanelView
