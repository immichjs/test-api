const { CategorySchema } = require('../schemas/Category.schema')

class Category {
  async findAll(complete) {
    let categories

    complete
      ? categories = await CategorySchema.find().populate('establishment').select('-createdAt')
      : categories = await CategorySchema.find()

    return categories
  }

  async findOne(_id, complete) {
    const message = '[Error]: Nenhuma categoria foi encontrada.'

    if (!_id) throw new Error(message)

    let category

    complete
      ? category = await CategorySchema.findOne({ _id }).populate('establishment').select('-createdAt')
      : category = await CategorySchema.findOne({ _id })

    if (!category) throw new Error(message)

    return category
  }

  async createOne(categoryDto) {
    const { name, establishment } = categoryDto
    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (!name || !establishment) throw new Error('[Error]: Preencha todos os campos.')


    const alreadyCategory = await CategorySchema.findOne({ establishment, name })
    if (alreadyCategory) throw new Error('[Error]: Já existe uma categoria cadastrada neste estabelecimento.')
    if (name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')

    const category = await CategorySchema.create(categoryDto)
    return category
  }

  async updateOne(_id, categoryDto) {
    const { name } = categoryDto

    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (name && name.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')

    await CategorySchema.updateOne({ _id }, categoryDto)

    const category = await CategorySchema.findOne({ _id })

    if (!category) throw new Error('[Error]: Não foi possível editar o estabelecimento.')

    return category
  }

  async removeOne(_id) {
    const category = await CategorySchema.findOneAndRemove({ _id })

    if (!category) throw new Error('[Error]: Não foi possível remover esta categoria.')

    return { message: 'Categoria removida com êxito.' }
  }
}

module.exports = new Category()