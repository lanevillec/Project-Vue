exports.handler = async (event) => {
  //const axios = require('axios');
  //const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const inputText = event.queryStringParameters.inputText
  console.log('input text received to netlify function is ' + inputText)

  /*axios
        .post("https://api.openai.com/v1/engines/davinci/completions", {
          prompt: inputText,
          max_tokens: 100,
          n: 1,
          stop: "",
          temperature: 0.5,
        }, {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          }
        })
        .then((response) => {
          this.messages.push(response.data.choices[0].text);
        })
        .catch((error) => {
          console.error(error);
        });

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: OPENAI_API_KEY,
    }),
  };*/
};
