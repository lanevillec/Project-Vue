<template>
  <div :style="{ backgroundColor: color }">
    <!--<button @click="sendInput">Send Input</button>-->
    <!--<button @click="getValue">Get Value</button>-->
    <h1>Describe a color</h1>
    <input v-model="inputText" />
    <button @click="passAndReceiveValue">Generate Color</button>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: "",
      message: "",
      endPoint: '/.netlify/functions/',
      color: "#FFFFFF"
    };
  },
  computed: {
    bgClass() {
      return {
        "bg-color": true,
      };
    },
  },
  methods: {
    async getValue() {
      try {
        //was /.netlify/functions/test-get-value
        console.log('getValue function was triggered successfully!')
        const response = await fetch(this.endPoint.concat("test-get-value"));
        const data = await response.json();
        console.log('Success! Was able to get value from netlify function: ' + JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    },
    async passAndReceiveValue() {
      console.log('passAndReceive has been triggered with the follwing value: ' + this.inputText)

      try {
        const response = await axios.post(this.endPoint.concat("test-pass-value"), {
          message: this.inputText
        });
        console.log('Response received from netlify function test-past-value is: ' + JSON.stringify(response))
        let message = JSON.stringify(response.data)
        message = message.substring(5, message.length - 1)
        this.color = message
        this.message = message
      } catch (err) {
        console.error(err);
      }
    },
    async sendInput() {
      try {
        console.log('the input from the user to be sent to netlify function is: ' + this.inputText)
        const response = await fetch("/.netlify/functions/api-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: this.inputText })
        });
        const data = await response.json();
        console.log('Success! Was able to get info from openai api: ' + JSON.stringify(data));
      } catch (error) {
        console.error('error with sending request to netlify function: ' + error);
      }
    }
  }
};
</script>

<style>
.bg-color {
  background-color: #0077BE;
}
</style>

