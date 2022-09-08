const { mongoose } = require('../config/database/mongoose')

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
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

const OrderSchama = mongoose.model('Order', orderSchema)

module.exports = { OrderSchama }