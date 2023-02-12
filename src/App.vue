<template>
  <div>
    <input v-model="inputText" />
    <button @click="sendInput">Send Input</button>
    <button @click="getValue">Get Value</button>
    <button @click="passAndReceiveValue">Pass and Receive Value</button>
    <div>{{ message }}</div>
    changes!112121
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: "",
      message: "",
      //endPoint: '/.netlify/functions/',
      endPoint: '/.netlify/functions/',
    };
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
        let message = JSON.stringify(response.data).replace(/(\r\n|\n|\r)/gm, "")
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

