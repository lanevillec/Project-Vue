const axios = require('axios');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const input = data.input
  console.log('the data received from the view app to the netlify function is: ' + data)
  console.log('the input from the data received from vue is: ' + input)
  //test
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/jobs', {
      prompt: input
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
