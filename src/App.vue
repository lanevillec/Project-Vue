<template>
  <div :style="{ backgroundColor: color }">
    <div class="container">
      <h1 :style="{ color: fontColor}">Color Generator</h1>
      <textarea class="inputText" v-model="inputText" placeholder="describe a color..."></textarea>
      <button class="button" @click="getOpenAICompletion">Generate Color</button>
      <p :style="{ color: fontColor}">{{ summary }}</p>
      <h1 :style="{ color: fontColor}">Image Generator</h1>
      <textarea class="inputText" v-model="inputTextImage" placeholder="describe a picture..."></textarea>
      <button class="button" @click="getOpenAIImage">Generate Image</button>
      <img class="generatedImage" :src="imageSrc" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: "",
      inputTextImage: "",
      imageUrl: null,
      message: "",
      endPoint: '/.netlify/functions/',
      color: "#FFFFFF",
      fontColor: "#000000",
      summary: "",
    };
  },
  computed: {
    imageSrc() {
      return this.imageUrl;
    }
  },
  methods: {
    async getOpenAICompletion() {
      console.log('passAndReceive has been triggered with the follwing value: ' + this.inputText)
      try {
        const response = await axios.post(this.endPoint.concat("getOpenAICompletion"), {
          message: this.inputText
        });
        console.log('Response received from netlify function test-past-value is: ' + JSON.stringify(response))
        let message = JSON.stringify(response.data)
        message = message.substring(5, message.length - 1)
        this.message = message
        let secondPrompt = 'generate hex for complimentary color to ' + this.message
        console.log('Secondary prompt for complimentary color is ' + secondPrompt)
        const response2 = await axios.post(this.endPoint.concat("getOpenAICompletion"), {
          message: secondPrompt
        });
        let complimentaryColor = JSON.stringify(response2.data)
        complimentaryColor = complimentaryColor.substring(5, complimentaryColor.length - 1)
        console.log('complimentary color to original is ' + complimentaryColor)
        this.color = message
        this.fontColor = complimentaryColor
        this.summary = 'The input <' + this.inputText + '> generated the color hex code ' + message + ' and a complimentary font color of ' + complimentaryColor
        this.inputText = ""
      } catch (err) {
        console.error(err);
      }
    },
    async getOpenAIImage() {
      try{
        const response2 = await axios.post(this.endPoint.concat("getOpenAIImage"), {
          message: this.inputTextImage
        });
        let rawImageUrl = response2.data
        this.imageUrl = rawImageUrl
        console.log('rawImageUrl is finally set to: ' + rawImageUrl)
        console.log('imageUrl returned from openai is: ' + this.imageUrl)
      } catch (err) {
        console.error(err);
      }
      
    }
  }
};
</script>

<style>
html, body {
  background-color: black;
  margin: 0px !important;
  padding: 0px !important

}

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

.bg-color {
  background-color: inherit;
}

.container {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 1.5rem;
}

.inputText {
  line-height: 2rem;
  width: 80%;
}

.button {
  padding: auto;
  font-size: 1rem;
  width: 30%;
  height: 2rem;
}

.generatedImage {
  width: 80%;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FFFFFF;
}
</style>

