const axios = require('axios');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  console.log(data)
  //test
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/jobs', {
      prompt: data
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
