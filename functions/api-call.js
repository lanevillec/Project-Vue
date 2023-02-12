const openai = require('openai');

exports.handler = async (event) => {
  let input = event.body.input

  try {
    const completion = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt: input,
        temperature: 0.6
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
  /*openai.prompt(input, {
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
};*/
