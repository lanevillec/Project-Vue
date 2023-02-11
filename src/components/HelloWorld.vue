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
        const response = await fetch("/.netlify/functions/api-call", {
          method: "POST",
          body: JSON.stringify({ input: this.inputText })
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
