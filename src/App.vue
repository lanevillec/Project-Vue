<template>
  <div>
    <input v-model="inputText" />
    <button @click="sendInput">Send Input</button>
    <button @click="getValue">Get Value</button>
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
    async getValue() {
      try {
        const response = await fetch("/.netlify/functions/test-get-value");
        const data = await response.json();
        console.log('Success! Was able to get value from netlify function: ' + JSON.stringify(data));
      } catch (error) {
        console.error(error);
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
        console.log(data);
      } catch (error) {
        console.error('error with sending request to netlify function: ' + error);
      }
    }
  }
};
</script>

