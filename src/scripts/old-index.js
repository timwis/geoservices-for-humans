import $ from 'jquery'
import keyBy from 'lodash/keyBy'
import 'bootstrap/js/collapse'

import fieldsTemplate from '../templates/fields.html'
import sampleUrlTemplate from '../templates/sample-url.html'
import setFriendlyFieldType from './friendly-field-types'

$('form').on('submit', (e) => {
  let serviceUrl = $('#service-url').val()
  fetchFields(serviceUrl)
  e.preventDefault()
})

const defaultServiceUrl = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Incidents_2006/FeatureServer/0'
fetchFields(defaultServiceUrl)

// Fetch list of fields
function fetchFields (serviceUrl) {
  $.ajax({
    url: serviceUrl,
    dataType: 'json',
    data: {f: 'json'}
  }).then((response) => {
    const fields = response.fields.map(setFriendlyFieldType)
    const fieldsHash = keyBy(fields, 'name')

    // Render fields
    const fieldsMarkup = fieldsTemplate({fields: fields})
    $('#fields').empty().append(fieldsMarkup)

    // Listen to accordion show event
    $('#accordion').collapse().on('show.bs.collapse', (e) => {
      const shownContentEl = $(e.target)
      const fieldName = shownContentEl.data('field')
      const field = fieldsHash[fieldName]

      // Get a sample value for the selected field
      getSampleValue(serviceUrl, fieldName).then((sampleValue) => {
        var sampleUrl = constructSampleUrl(serviceUrl, fieldName, field.friendlyType, sampleValue)

        // Render sample url
        const sampleUrlMarkup = sampleUrlTemplate({sampleUrl: sampleUrl})
        $('.sample-url', shownContentEl).empty().append(sampleUrlMarkup)
      })
    })

    // Listen to sample-url clicks
    $('body').on('click', '.sample-url a', (e) => {
      const clickedEl = $(e.currentTarget)
      const href = clickedEl.attr('href')
      $.ajax({
        url: href,
        dataType: 'json'
      }).then((response) => {
        clickedEl.parent().next('.sample-results').show().empty().append(JSON.stringify(response, null, 2))
      })
      e.preventDefault()
    })
  })
}

function getSampleValue (serviceUrl, fieldName) {
  return $.ajax({
    url: serviceUrl + '/query',
    dataType: 'json',
    data: {
      f: 'json',
      outFields: fieldName,
      where: `${fieldName} IS NOT NULL`,
      resultRecordCount: 1
    }
  }).then((response) => response.features.length && response.features[0].attributes[fieldName])
}

function constructSampleUrl (serviceUrl, field, friendlyType, sampleValue) {
  const sampleQuery = {
    where: `${field} = ${enclose(sampleValue, friendlyType)}`,
    f: 'json',
    outFields: '*'
  }
  const sampleQueryString = $.param(sampleQuery)
  
  return `${serviceUrl}/query?${sampleQueryString}`
}

function enclose (value, friendlyType) {
  var nonQuotedTypes = ['integer', 'objectid', 'double']
  return nonQuotedTypes.includes(friendlyType) ? value : `'${value}'`
}
