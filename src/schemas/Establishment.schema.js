const { mongoose } = require('../config/database/mongoose')

const establishmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    street: String,
    number: Number,
    cep: String,
    district: String,
    city: String,
    uf: String,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false })

const EstablishmentSchema = mongoose.model('Establishment', establishmentSchema)

module.exports = { EstablishmentSchema }