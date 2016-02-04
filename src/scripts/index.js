import FieldContainerView from './views/field-container-view'

var fieldContainerView = new FieldContainerView()
fieldContainerView.serviceUrl = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Incidents_2006/FeatureServer/0'
document.querySelector('#main').appendChild(fieldContainerView.render().el)
