require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('./controllers')(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('http://localhost:3000'))