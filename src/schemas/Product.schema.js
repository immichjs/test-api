const { mongoose } = require('../config/database/mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0.0
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

const ProductSchema = mongoose.model('Product', productSchema)

module.exports = { ProductSchema }