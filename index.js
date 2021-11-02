const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('Hello world received a request.')
  console.log('req body', req)
  res.send('Hello, Welcome to CloudBase!')
})

app.post('/', (req, res) => {
  console.log('Hello world received a request.')
  console.log('req body', req)
  res.send('Hello, Welcome to CloudBase Post!')
})

const port = process.env.PORT || 80
app.listen(port, () => {
  console.log('Hello world listening on port', port)
})
