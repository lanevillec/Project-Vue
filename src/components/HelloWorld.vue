<template>
  <div>
    <input v-model="inputText" />
    <button @click="sendInput">Send Input</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: ""
    };
  },
  methods: {
    async sendInput() {
      try {
        console.log('the input from the user to be sent to netlify function is: ' + this.inputText)
        let bodyToSend = JSON.stringify({ input: this.inputText })
        console.log('bodyToSend to netlify function is: ' + bodyToSend)
        const response = await fetch("/.netlify/functions/api-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: this.inputText })
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('error with sending request to netlify function: ' + error);
      }
    }
  }
};
</script>
