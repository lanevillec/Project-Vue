<template>
  <div>
    <textarea v-model="inputText"></textarea>
    <button @click="sendText">Send</button>
    <div>{{ response }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputText: "",
      response: "",
    };
  },
  methods: {
    async sendText() {
      axios
        .post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: this.inputText,
            max_tokens: 1024,
            temperature: 0.5,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data.choices[0].text);
          this.response = response.data.choices[0].text;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
