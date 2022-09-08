const { mongoose } = require('../config/database/mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  establishment: {
    type: mongoose.Types.ObjectId,
    ref: 'Establishment',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

const CategorySchema = mongoose.model('Category', categorySchema)

module.exports = { CategorySchema }