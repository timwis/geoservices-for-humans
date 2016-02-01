import Collection from 'ampersand-collection'

import FieldModel from '../models/field-model'

const FieldCollection = Collection.extend({
  model: FieldModel
})

export default FieldCollection
