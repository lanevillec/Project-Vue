const express = require('express')
const app = express()
const port = 3000
var qs = require('qs');
const axios = require('axios')

const VUE_APP_OPENAI_API_KEY = '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';

app.get('/', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  console.log(request.query);
  let query = request.query;
  query.appId = VUE_APP_OPENAI_API_KEY;
  let queryString = qs.stringify(query);
  axios.post(queryString).then( response => 
    response.send(request.data))
})

//https://api.openai.com/v1/engines/davinci/jobs

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})