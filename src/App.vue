<template>
  <div id="app">
    <div class="sidebar">
      <div class="header">
        <div class="icon"></div>
        <div class="name">Christopher Laneville</div>
      </div>
      <ul>
        <li><router-link active-class="active" to="/project-page">Project Page</router-link></li>
        <li><router-link active-class="active" to="/ai-factory">AI Factory</router-link></li>
        <li><router-link active-class="active" to="/about-me">About Me</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  font-family: 'Arial', sans-serif;
  color: #f1f1f1; /* Light color for text on dark background */
}

.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #0d253f; /* Dark navy color for sidebar background */
  padding: 15px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px 0;
}

.sidebar ul li a {
  color: #f1f1f1;
  text-decoration: none;
}

.sidebar ul li a:hover {
  color: #88a2aa; /* Lighter earthy color on hover */
  cursor: pointer;
}

.sidebar ul li a.active {
  color: #fab005; /* Earth tone pop of color for active link */
}

.content {
  flex-grow: 1;
  padding: 15px;
  background-color: #1b394c; /* Slightly lighter navy for content background */
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #fab005; /* earth tone color */
}

.icon {
  width: 30px;
  height: 30px;
  background-color: #fab005; /* earth tone color */
  border-radius: 50%; /* creates a circle */
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

</style>
