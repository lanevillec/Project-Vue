exports.handler = async (event) => {
    //const { Configuration, OpenAIApi, Image } = require("openai");
    const axios = require('axios');
    const apiKey = process.env.OPENAI_API_KEY;
    const data = JSON.parse(event.body);
    const inputTextForImage = data.message
    console.log('*****data received to netlify function from vue app is: ' + JSON.stringify(data))
    console.log('inputTextForImage variable now contains: ' + inputTextForImage);
    console.log('api key retrieved from environment variable is ' + apiKey)


    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          model: 'image-alpha-001',
          prompt: inputTextForImage
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })

        this.imageUrl = response.data.data[0].url
      } catch (error) {
        console.error(error)
      }
  
  };
  