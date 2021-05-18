const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
require('dotenv').config()

const db = require('./db')
const petRouter = require('./route/pet')

const app = express()
const port = 5000

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/api', (req, res) => {
  res.send('Welcome to Petto API!')
})

app.use('/api', petRouter)

// 404 api route
app.use((req, res, next) => {
  next(createError(404, 'Not found'))
})
// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
