const mongoose = require('mongoose')

async function bootstrap() {
  await mongoose.connect('mongodb://localhost:27017/uaimenu')

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

bootstrap()
  .catch(error => console.log(error))

module.exports = { mongoose }