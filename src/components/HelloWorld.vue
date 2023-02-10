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
        const resp = await fetch(`/.netlify/functions/get-api-key?inputText=${ this.inputText }`);
        this.msg = await resp.json()
        console.log('message returned is ' + this.msg)
  },
}

</script>
