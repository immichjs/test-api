const { UserSchema } = require('../schemas/User.schema')

class UserService {
  async findAll() {
    const users = await UserSchema.find()
    return users
  }

  async findOne(_id) {
    const message = '[Error]: Nenhum usuário foi encontrado.'
    if (!_id) throw new Error(message)

    const user = await UserSchema.findOne({ _id })
    if (!user) throw new Error(message)

    return user
  }

  async createOne({ name, email, phone, cpf }) {
    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (!name || !email || !phone || !cpf) throw new Error('[Error]: Preencha todos os campos.')

    const alreadyUser = await UserSchema.findOne({ cpf })
    if (alreadyUser) throw new Error('[Error]: Já existe um usuário cadastrado com este CPF.')
    if (name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (phone.length < 11) throw new Error('[Error]: Número de celular inválido. (00) 00000-0000')
    if (cpf.length < 11) throw new Error('[Error]: Número de CPF inválido. (000.000.000-00)')

    const user = await UserSchema.create({ name, email, phone, cpf })
    return user
  }

  async updateOne(_id, dto) {
    const { name, phone, cpf } = dto

    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    const alreadyUser = await UserSchema.findOne({ cpf })
    if (alreadyUser) throw new Error('[Error]: Já existe um usuário cadastrado com este CPF.')
    if (name && name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (phone && phone.length < 11) throw new Error('[Error]: Número de celular inválido. (00) 00000-0000')
    if (cpf && cpf.length < 11) throw new Error('[Error]: Número de CPF inválido. (000.000.000-00)')

    await UserSchema.updateOne({ _id }, dto)
    const user = await UserSchema.findOne({ _id })

    if (!user) throw new Error('[Error]: Não foi possível editar o usuário.')

    return user
  }

  async removeOne(_id) {
    const user = await UserSchema.findOneAndRemove({ _id })

    if (!user) throw new Error('[Error]: Não foi possível remover este usuário.')

    return { message: 'Usuário removido com êxito.' }
  }
}

module.exports = new UserService()