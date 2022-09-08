const { ProductSchema } = require('../schemas/Product.schema')

class Product {
  async findAll(complete) {
    let products

    complete
      ? products = await ProductSchema.find().populate({
        path: 'category',
        model: 'Category',
        select: '-createdAt',
        populate: {
          path: 'establishment',
          model: 'Establishment',
          select: '-createdAt',
        }
      })
      : products = await ProductSchema.find()

    return products
  }

  async findOne(_id, complete) {
    const message = '[Error]: Nenhum produto foi encontrado.'

    if (!_id) throw new Error(message)

    let product

    complete
      ? product = await ProductSchema.findOne({ _id }).populate({
        path: 'category',
        model: 'Category',
        select: '-createdAt',
        populate: {
          path: 'establishment',
          model: 'Establishment',
          select: '-createdAt'
        }
      })
      : product = await ProductSchema.findOne({ _id })

    if (!product) throw new Error(message)

    return product
  }

  async createOne(productDto) {
    const { title, description, price, category } = productDto
    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (!title || !description || !price || !category) throw new Error('[Error]: Preencha todos os campos.')

    const alreadyProduct = await ProductSchema.findOne({ title, description, category })
    if (alreadyProduct) throw new Error('[Error]: Já existe um produto igual nesta categoria.')
    if (title.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (price <= 0) throw new Error('[Error]: Preço do produto deve ser maior que R$ 0.')

    const product = await ProductSchema.create(productDto)
    return product
  }

  async updateOne(_id, productDto) {
    const { title, description, price, category } = productDto

    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    const alreadyProduct = await ProductSchema.findOne({ title, description, category })
    if (alreadyProduct) throw new Error('[Error]: Já existe um produto igual nesta categoria.')
    if (title.length < 3) throw new Error('[Error]: Nome deve ser maior que 3 caractéres.')
    if (price <= 0) throw new Error('[Error]: Preço do produto deve ser maior que R$ 0.')

    await ProductSchema.updateOne({ _id }, productDto)

    const product = await ProductSchema.findOne({ _id })

    if (!product) throw new Error('[Error]: Não foi possível editar o produto.')

    return product
  }

  async removeOne(_id) {
    const product = await ProductSchema.findOneAndRemove({ _id })

    if (!product) throw new Error('[Error]: Não foi possível remover este produto.')

    return { message: 'Produto removido com êxito.' }
  }
}

module.exports = new Product()