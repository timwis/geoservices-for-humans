const typeMap = {
  esriFieldTypeString: 'string',
  esriFieldTypeDate: 'date',
  esriFieldTypeSmallInteger: 'integer',
  esriFieldTypeOID: 'objectid',
  esriFieldTypeGeometry: 'geometry',
  esriFieldTypeDouble: 'double'
}

function setFriendlyFieldType (field) {
  field.friendlyType = typeMap[field.type] || field.type
  return field
}

export default setFriendlyFieldType
