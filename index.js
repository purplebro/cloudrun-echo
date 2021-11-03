const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const request = require('request');

app.use(express.json())

app.get('/', (req, res) => {
  console.log('Hello world received a request.')
  console.log('req body', req.body)
  res.send('Hello, Welcome to CloudBase!')
})

app.post('/', (req, res) => {
  fs.readFile('/.tencentcloudbase/wx/cloudbase_access_token', "utf8", (err, data) => {
    if (err) throw err;
    console.log('cloudbase_access_token', data);
  });

  console.log('Hello world received a request.')
  console.log('req body', req.body)
  const data = JSON.stringify({
    "cloudid_list": [req.body.cloudID]
  })
  const options = {
    uri: 'http://api.weixin.qq.com/wxa/getopendata?openid=' + req.headers["x-wx-openid"],
    body: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  console.log('options', options)
  console.log('data', data)
  request(options, function (error, response) {
    res.json(response.body)
    console.log(error, response.body)
    return
  })
})

const port = process.env.PORT || 80
app.listen(port, () => {
  console.log('Hello world listening on port', port)
})
