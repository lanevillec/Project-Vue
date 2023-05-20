<template>
    <div :style="{ backgroundColor: color }">
      <div class="container">
        <h1 :style="{ color: fontColor }">Color Generator</h1>
        <textarea class="inputText" v-model="inputText" placeholder="describe a color..."></textarea>
        <button class="button" @click="getOpenAICompletion">Generate Color</button>
        <p :style="{ color: fontColor }">{{ summary }}</p>
        <h1 :style="{ color: fontColor }">Answer Generator</h1>
        <textarea class="inputText" v-model="inputTextAnswer" placeholder="type your question..."></textarea>
        <button class="button answerButton" @click="getOpenAICompletionAnswer">Generate Answer</button>
        <p :style="{ color: fontColor }">{{ promptForAnswer }}</p>
        <p :style="{ color: fontColor }">{{ answer }}</p>
        <h1 :style="{ color: fontColor }">Image Generator</h1>
        <textarea class="inputText" v-model="inputTextImage" placeholder="describe a picture..."></textarea>
        <button class="button" @click="getOpenAIImage">Generate Image</button>
        <p :style="{ color: fontColor }">{{ promptForImage }}</p>
        <img class="generatedImage" :src="imageSrc" />
        <h1 :style="{ color: fontColor}">Sound Analyzer</h1>
        <form>
          <input type="file" ref="fileInput" @change="uploadFile"/>
        </form>
        <p :style="{ color: fontColor}">{{ notes }}</p>
        <h1 :style="{ color: fontColor }">Transcript Creator</h1>
        <input type="file" @change="handleFileUpload" />
        <button @click="generateTranscript" :disabled="!file">Generate Transcript</button>
        <div v-if="transcript">{{ transcript }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  //import Tone from 'tone';
  
  export default {
    data() {
      return {
        inputText: "",
        inputTextImage: "",
        promptForImage: "",
        inputTextAnswer: "",
        promptForAnswer: "",
        answer: "",
        imageUrl: null,
        message: "",
        endPoint: '/.netlify/functions/',
        color: "#FFFFFF",
        fontColor: "#000000",
        summary: "",
        notes: null,
        transcript: "",
        file: null,
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
      async getOpenAICompletionAnswer() {
        console.log('passAndReceive has been triggered with the follwing value: ' + this.inputText)
        try {
          const response = await axios.post(this.endPoint.concat("getOpenAICompletionAnswer"), {
            message: this.inputTextAnswer
          });
          console.log('Response received from netlify function test-past-value is: ' + JSON.stringify(response))
          let message = JSON.stringify(response.data)
          message = message.substring(5, message.length - 1)
          this.promptForAnswer = "Your question: " + this.inputTextAnswer
          this.answer = message.split("\n\n").join("<br>")
          this.inputTextAnswer = ""
        } catch (err) {
          console.error(err);
        }
      },
      async getOpenAIImage() {
        try {
          const response2 = await axios.post(this.endPoint.concat("getOpenAIImage"), {
            message: this.inputTextImage
          });
          let rawImageUrl = response2.data
          this.imageUrl = rawImageUrl
          console.log('rawImageUrl is finally set to: ' + rawImageUrl)
          console.log('imageUrl returned from openai is: ' + this.imageUrl)
          this.promptForImage = "Your image prompt: " + this.inputTextImage
          this.inputTextImage = ""
        } catch (err) {
          console.error(err);
        }
        
      },
      /*async uploadFile() {
        const input = this.$refs.fileInput
        const file = input.files[0]
  
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(file);
        const tone = new Tone.ToneAudioBuffer(audioBuffer);
        const midi = new Tone.MidiConvert();
        const notes = midi.getNotes(tone.toToneBuffer());
        console.log('Notes produced by audio analysis with Tone are : ' + JSON.stringify(notes))
  
        this.notes = notes;
  
      },
      setup() {
      const file = ref(null)
      const transcript = ref(null)
  
      const handleFileUpload = event => {
        file.value = event.target.files[0]
      }
  
      const generateTranscript = async () => {
        const formData = new FormData()
        formData.append('file', file.value)
  
        try {
          const response = await axios.post('https://api.assemblyai.com/v2/transcript', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': '42c9eaef6bc94a7ba57a59c5940cb99d'
            }
          })
  
          const { id } = response.data
  
          let status = 'queued'
  
          while (status === 'queued' || status === 'processing') {
            const { data } = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
              headers: {
                'Authorization': '42c9eaef6bc94a7ba57a59c5940cb99d'
              }
            })
  
            status = data.status
  
            if (status === 'completed') {
              transcript.value = data.text
            } else {
              await new Promise(resolve => setTimeout(resolve, 1000))
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
  
      return {
        file,
        transcript,
        handleFileUpload,
        generateTranscript
      }
     onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const content = e.target.result;
          // Do something with the file content
          console.log(content)
          this.generateTranscript(content)
        };
        reader.readAsText(file);
      },
      async generateTranscript(file) {
        const axios = require("axios");
  
        console.log('Generate transcript has fired!')
        const assembly = axios.create({
          baseURL: "https://api.assemblyai.com/v2",
          headers: {
            authorization: "42c9eaef6bc94a7ba57a59c5940cb99d",
            "transfer-encoding": "chunked",
          },
        });
  
        assembly
          .post("/upload", file)
          .then((res) => {
            let upload_url = res.data
            console.log('Audio file uploaded at this URL: ' + upload_url)
            assembly
              .post("/transcript", {
                audio_url: upload_url
              })
              .then((res) => {
                console.log('Transcript returned is: ' + res.data)
                this.transcript = res.data
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
  
      },
      async generateSummary(transcript){
        console.log(transcript)
      }*/
  
    }
  };
  </script>
  
  <style>
  
  html,
  body {
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
  
  