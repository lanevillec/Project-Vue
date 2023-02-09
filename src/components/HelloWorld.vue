<template>
  <div>
    <img :src="imageUrl" />
  </div>
</template>

<script>
import axios from "axios";
import openai from "@openai/image-api";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  created() {
    axios
      .get("/.netlify/functions/get-api-key")
      .then((response) => {
        const model = openai.prompt("image-alpha-001", {
          apiKey: response.data.apiKey,
        });

        axios
      .post("https://api.openai.com/v1/images/generations", {
        model: model,
        prompt: "A tree with leaves",
      })
      .then((response) => {
        this.imageUrl = response.data.data[0].url;
      })
      .catch((error) => {
        console.error(error);
      });

      })
  },
}
</script>
