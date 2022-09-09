const { OrderSchama } = require('../schemas/Order.schema')

class Product {
  async findAll() {
    const order = await OrderSchama.find()
      .populate({
        path: 'products',
        model: 'Product',
        select: '-createdAt -_id',
        populate: {
          path: 'category',
          model: 'Category',
          select: '-createdAt -establishment -_id',
        }
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '-createdAt'
      })
      .populate({
        path: 'establishment',
        model: 'Establishment',
        select: '-createdAt'
      })

    return order
  }

  async findOne(_id) {
    const message = '[Error]: Nenhum pedido foi encontrado.'

    if (!_id) throw new Error(message)

    const order = await OrderSchama.find()
      .populate({
        path: 'products',
        model: 'Product',
        select: '-createdAt',
        populate: {
          path: 'category',
          model: 'Category',
          select: '-createdAt -establishment',
        }
      })
      .populate('user').select('-createdAt')
      .populate('establishment').select('-createdAt')

    if (!order) throw new Error(message)

    return order
  }

  async createOne(orderDto) {
    const { products, user, establishment } = orderDto
    // Validações antes de criar usuário, evita consumo desnecessário de processamento.
    if (!products || !user || !establishment) throw new Error('[Error]: Preencha todos os campos.')

    const order = await OrderSchama.create(orderDto)
    return order
  }

  async updateOne(_id, orderDto) {
    const { product, user, establishment } = orderDto
    // Validações antes de editar usuário, evita consumo desnecessário de processamento.
    if (!product || !user || !establishment) throw new Error('[Error]: Preencha todos os campos.')

    await OrderSchama.updateOne({ _id }, orderDto)

    const order = await OrderSchama.findOne({ _id })

    if (!order) throw new Error('[Error]: Não foi possível editar o pedido.')

    return order
  }

  async removeOne(_id) {
    const order = await OrderSchama.findOneAndRemove({ _id })

    if (!order) throw new Error('[Error]: Não foi possível remover este pedido.')

    return { message: 'Pedido removido com êxito.' }
  }
}

module.exports = new Product()