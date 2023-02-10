<!DOCTYPE html>
<html>
  <head>
    <title>Netlify Function Example</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <h1>Netlify Function Example</h1>
      <form>
        <label for="input">Enter text:</label>
        <input type="text" id="input" v-model="input" required>
        <button id="submit-button" @click.prevent="submit">Submit</button>
      </form>
      <pre id="response">{{ response }}</pre>
    </div>

    <script>
      const app = new Vue({
        el: '#app',
        data: {
          input: '',
          response: ''
        },
        methods: {
          async submit() {
            const response = await fetch('/.netlify/functions/api-call', {
              method: 'POST',
              body: JSON.stringify({ text: this.input }),
              headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            this.response = JSON.stringify(data, null, 2);
          }
        }
      });
    </script>
  </body>
</html>

