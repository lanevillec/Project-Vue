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
//import axios from "axios";

export default {

  data() {
    return {
      inputText: "",
      messages: [],
    };
  },

  async sendMessage() {
    fetch('/.netlify/functions/api-call', {
      method: 'POST',
      body: JSON.stringify({ text: 'your input here' }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

  },
}

</script>
