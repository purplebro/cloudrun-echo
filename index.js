const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')


app.use(express.json())

app.get('/', (req, res) => {
  console.log('Hello world received a request.')
  console.log('req body', req.body)
  res.send('Hello, Welcome to CloudBase!')
})

app.post('/', (req, res) => {
  console.log('Hello world received a request.')
  console.log('req body', req.body)
  const data = JSON.stringify({
    "cloudid_list": [req.body.cloudID]
  })
  const options = {
    hostname: 'api.weixin.qq.com',
    path: '/wxa/getopendata?openid=' + req.header["x-wx-openid"],
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  console.log('options', options)
  console.log('data', data)
  const httpsReq = https.request(options, httpsResp => {
    console.log(`状态码: ${httpsResp.statusCode}`)
  
    httpsResp.on('data', d => {
      console.log('api send response', d);
      res.send('api send response', d)
    })
  })
  
  httpsReq.on('error', error => {
    console.error(error)
  })
  
  httpsReq.write(data)
  httpsReq.end()
})

const port = process.env.PORT || 80
app.listen(port, () => {
  console.log('Hello world listening on port', port)
  fs.readFile('/.tencentcloudbase/wx/cloudbase_access_token', (err, data) => {
    if (err) throw err;
    console.log('cloudbase_access_token', data);
  });
})
