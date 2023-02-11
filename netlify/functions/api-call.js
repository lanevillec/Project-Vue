const openai = require('openai');

exports.handler = async (event) => {
  let input = event.body.input
  console.log('input netlify function received is: ' + input)
  openai.prompt(input, {
    model: "davinci",
    apiKey: process.env.OPENAI_API_KEY
  }, function(err, completions) {
    if (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(completions)
    };
  });
};
