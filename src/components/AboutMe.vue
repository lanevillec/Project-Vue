<template>
    <div class="about-me">
      <div class="iframe-container">
        <iframe class="resume-iframe" :src="resumeUrl" frameborder="0" allowfullscreen></iframe>
        <a :href="pdfDownloadUrl" class="download-button" target="_blank" title="Download Resume">
          <font-awesome-icon icon="download" />
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        resumeUrl: 'https://docs.google.com/document/d/e/2PACX-1vQrObIxupK0zg7903yS1hPTcUK-eXj-KDYx-SfFvfsqFM-AaN8yWlPaQUWtpW32FtkyoC9yPZLma6rH/pub?embedded=true',
        pdfDownloadUrl: 'https://docs.google.com/document/d/1UwVwnT28boufNj3st2qukfmRAMxJRG9M2lMn3Rb86gw/export?format=pdf'
      };
    }
  };
  </script>
  
  <style>
.about-me {
  display: flex;
  min-height: 100vh; /* This ensures the minimum height is the full viewport height */
  padding: 0; /* Adjust padding as needed */
}

.iframe-container {
  width: 60%; /* Assuming you want a total of 20px margin on each side */
  max-width: 1200px; /* Adjust this to set a maximum size */
  margin: 0px; /* This centers the container in the available horizontal space */
  position: relative;
  padding: 0px; /* Space for the download button */
}

.resume-iframe {
  width: 100%;
  height: 750px;
  border: none;
}

.download-button {
  position: absolute;
  top: 0; /* Positions the button at the top of the iframe-container */
  right: 0; /* Positions the button to the right within the iframe-container */
  z-index: 10; /* Ensures the button is above the iframe */
  background-color: #007bff;
  color: white;
  padding: 10px;
  margin-right: 30px;
  border-radius: 50%;
  text-decoration: none;
  cursor: pointer; /* Changes the cursor to indicate it's clickable */
}

.download-button:hover {
  background-color: #0056b3;
}

.fa-download {
  font-size: 20px;
}
</style>


  