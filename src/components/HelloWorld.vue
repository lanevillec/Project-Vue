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
    let apiKey = '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';
    console.log('api key is ' + apiKey);
      try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
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
