const { EstablishmentSchema } = require('../schemas/Establishment.schema')

class Establishment {
  async findAll() {
    const establishments = await EstablishmentSchema.find()
    return establishments
  }

  async findOne(_id) {
    const message = '[Error]: Nenhum estabelecimento foi encontrado.'

    if (!_id) throw new Error(message)

    const establishment = await EstablishmentSchema.findOne({ _id })
    if (!establishment) throw new Error(message)

    return establishment
  }

  async createOne(establishmentDto) {
    const { name, phone, cpf } = establishmentDto
    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (!name || !phone || !cpf) throw new Error('[Error]: Preencha todos os campos.')

    const alreadyEstablishment = await EstablishmentSchema.findOne({ cpf })
    if (alreadyEstablishment) throw new Error('[Error]: Já existe um estabelecimento cadastrado com este CPF.')
    if (name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (phone.length < 11) throw new Error('[Error]: Número de celular inválido. (00) 00000-0000')
    if (cpf.length < 11) throw new Error('[Error]: CPF inválido. (000.000.000-00)')

    const user = await EstablishmentSchema.create(establishmentDto)
    return user
  }

  async updateOne(_id, establishmentDto) {
    const { name, phone, cpf } = establishmentDto

    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    const alreadyEstablishment = await EstablishmentSchema.findOne({ cpf })
    if (alreadyEstablishment) throw new Error('[Error]: Já existe um estabelecimento cadastrado com este CPF.')
    if (name && name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (phone && phone.length < 11) throw new Error('[Error]: Número de celular inválido. (00) 00000-0000')
    if (cpf && cpf.length < 11) throw new Error('[Error]: CPF inválido. (000.000.000-00)')

    await EstablishmentSchema.updateOne({ _id }, establishmentDto)

    const establishment = await EstablishmentSchema.findOne({ _id })

    if (!establishment) throw new Error('[Error]: Não foi possível editar o estabelecimento.')

    return establishment
  }

  async removeOne(_id) {
    const establishment = await EstablishmentSchema.findOneAndRemove({ _id })

    if (!establishment) throw new Error('[Error]: Não foi possível remover este estabelecimento.')

    return { message: 'Estabelecimento removido com êxito.' }
  }
}

module.exports = new Establishment()