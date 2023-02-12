exports.handler = async (event) => {
  const { Configuration, OpenAIApi } = require("openai");
  //const axios = require('axios');
  const apiKey = process.env.OPENAI_API_KEY;
  const data = JSON.parse(event.body);
  const inputText= data.message
  const prompt = 'generate one color hex code representing '.concat(inputText)
  console.log('prompt will be: ' + prompt)
  console.log('*****data received to netlify function from vue app is: ' + JSON.stringify(data))
  console.log('inputText variable now contains: ' + inputText);
  console.log('api key retrieved from environment variable is ' + apiKey)

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0
  });
  console.log('full response from openai is ' + JSON.stringify(completion.data));
  console.log('got reponse from openai: ' + completion.data.choices[0].text);

  return {
    statusCode: 200,
    body: completion.data.choices[0].text,
  }

};
