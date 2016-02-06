import LayerModel from './models/layer-model'
import PageLayoutView from './views/page-layout-view'

const defaultServiceUrl = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Incidents_2006/FeatureServer/0'
const layer = new LayerModel(null, {serviceUrl: defaultServiceUrl})
layer.fetch()

const pageLayoutView = new PageLayoutView({model: layer})
document.querySelector('#main').appendChild(pageLayoutView.render().el)
