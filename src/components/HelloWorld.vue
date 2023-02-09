<template>
  <div>
    <textarea v-model="inputText"></textarea>
    <button @click="sendText">Send</button>
    <div>{{response}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: '',
      response: '',
    };
  },
  methods: {
    async sendText() {
    let apiKey = process.env.API_KEY;
      try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/jobs', {
          prompt: this.inputText,
          max_tokens: 100,
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
        this.response = response.data.choices[0].text;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
