import View from 'ampersand-view'
import 'bootstrap/js/tab'

import FieldPanelView from './field-panel-view'
import AggregationView from './aggregation-view'
import TabsTemplate from '../templates/tabs.html'

const TabsView = View.extend({
  template: TabsTemplate,
  subviews: {
    fieldList: {
      selector: '[data-hook=field-list]',
      prepareView: function () {
        return new FieldPanelView({model: this.model})
      }
    },
    aggregation: {
      selector: '[data-hook=aggregation]',
      prepareView: function () {
        return new AggregationView({model: this.model})
      }
    }
  }
})

export default TabsView
