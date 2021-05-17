const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 5000

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to Petto API!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
