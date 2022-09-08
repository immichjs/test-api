const { mongoose } = require('../config/database/mongoose')

const userSchema = new mongoose.Schema({
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    cep: String,
    street: String,
    number: Number,
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

const UserSchema = mongoose.model('User', userSchema)

module.exports = { UserSchema }