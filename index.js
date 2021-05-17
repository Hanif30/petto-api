const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')

const app = express()
const port = 5000

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Welcome to Petto API!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
