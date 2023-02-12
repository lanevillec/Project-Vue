<template>
  <div :style="{ backgroundColor: color }">
    <!--<button @click="sendInput">Send Input</button>-->
    <!--<button @click="getValue">Get Value</button>-->
    <div class="container">
      <h1 :style="{ color: headerColor}">Color Generator</h1>
      <!--<input class="inputBox" v-model="inputText" placeholder="describe a color..."/>-->
      <textarea v-model="inputText" placeholder="describe a color..."></textarea>
      <button class="button" @click="passAndReceiveValue">Generate</button>
      <p :style="{ color: headerColor}">{{ summary }}</p>
    </div>
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
      color: "#FFFFFF",
      headerColor: "#000000",
      summary: "",
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
        this.message = message
        let secondPrompt = 'generate hex for complimentary color to ' + this.message
        console.log('Secondary prompt for complimentary color is ' + secondPrompt)
        const response2 = await axios.post(this.endPoint.concat("test-pass-value"), {
          message: secondPrompt
        });
        let complimentaryColor = JSON.stringify(response2.data)
        complimentaryColor = complimentaryColor.substring(5, complimentaryColor.length - 1)
        console.log('complimentary color to original is ' + complimentaryColor)
        this.color = message
        this.headerColor = complimentaryColor
        this.summary = 'The input <' + this.inputText + '> generated the color hex code ' + message + ' and a complimentary font color of ' + complimentaryColor
        this.inputText = ""
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
html,
body {
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

}

.bg-color {
  background-color: inherit;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20%;
}

.button {
  width: 20%;
  margin: auto;
  padding: auto;
  font-size: 1rem;
}

.inputText {
  width: 50%;
  line-height: 5em;
  margin: auto;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FFFFFF;
  margin-top: 0px;
}
</style>

