import LayerModel from './models/layer-model'
import FieldListView from './views/field-list-view'

const defaultServiceUrl = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Incidents_2006/FeatureServer/0'
const layer = new LayerModel(null, {serviceUrl: defaultServiceUrl})
layer.fetch()

const fieldListView = new FieldListView({model: layer})
document.querySelector('#fields').appendChild(fieldListView.render().el)
