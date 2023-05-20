<template>
  <div id="app">
    <div class="sidebar">
      <ul>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/ai-factor">AI Factor</router-link></li>
        <li><router-link to="/about-me">About Me</router-link></li>
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
}

.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 15px;
}

.content {
  flex-grow: 1;
  padding: 15px;
}
</style>
<template>
  <div id="app">
    <div class="sidebar">
      <ul>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/ai-factor">AI Factor</router-link></li>
        <li><router-link to="/about-me">About Me</router-link></li>
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
}

.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 15px;
}

.content {
  flex-grow: 1;
  padding: 15px;
}
</style>
