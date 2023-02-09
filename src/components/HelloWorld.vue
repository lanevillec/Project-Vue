<template>
  <div>
    <textarea v-model="inputText"></textarea>
    <button @click="sendMessage">Send</button>
    <div v-for="(message, index) in messages" :key="index">
      {{ message }}
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      inputText: "",
      messages: [],
    };
  },
  sendMessage() {
        const apiKey = `/.netlify/functions/get-api-key?id=${apiKey}`

        axios
        .post("https://api.openai.com/v1/engines/davinci/completions", {
          prompt: this.inputText,
          max_tokens: 100,
          n: 1,
          stop: "",
          temperature: 0.5,
        }, {
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        })
        .then((response) => {
          this.messages.push(response.data.choices[0].text);
        })
        .catch((error) => {
          console.error(error);
        });
  },
}

</script>
