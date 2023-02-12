exports.handler = async (event) => {
  const { Configuration, OpenAIApi } = require("openai");
  //const axios = require('axios');
  const apiKey = process.env.OPENAI_API_KEY;
  const data = JSON.parse(event.body);
  const inputText = data.message
  console.log('*****data received to netlify function from vue app is: ' + JSON.stringify(data))
  console.log('inputText variable now contains: ' + inputText);
  console.log('api key retrieved from environment variable is ' + apiKey)

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: inputText,
  });
  console.log('got reponse from openai: ' + completion.data.choices[0].text);

  return {
    statusCode: 200,
    body: 'test',
  }


  /*try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: inputText,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    console.log('callout to open ai was a success and returned: ' + JSON.stringify(response));
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }*/

};
