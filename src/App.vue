<template>
  <div id="app">
    <div class="sidebar">
      <div class="header">
        <div class="profile">
          <div class="info">
            <!--<img src="/path-to-your-icon/icon.png" class="user-icon"/>-->
            <div class="name">Christopher Laneville</div>
          </div>
          <div class="cactuar-container">
            <img id="cactuar" src="/Cactuar.png" class="cactuar" />
          </div>
        </div>
        <!-- ... your navigation items ... -->
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

<script>
import { gsap } from "gsap";

export default {
  name: "App",
  mounted() {
    this.$nextTick(function () {
      let cactuar = document.querySelector("#cactuar");
      let container = cactuar.parentElement;
      let halfWidth = container.offsetWidth / 2;
      let halfCactuar = cactuar.offsetWidth / 2;

      let tl = gsap.timeline({ repeat: -1 });

      tl.to(cactuar, {
        duration: 3,
        x: halfWidth - halfCactuar,
        onStart: () => {
          gsap.set(cactuar, { scaleX: 1 });
        },
      })
        .to(cactuar, {
          duration: 1,
          rotationY: 720,
          ease: "none",
        })
        .to(cactuar, {
          duration: 3,
          x: container.offsetWidth - halfCactuar,
          onStart: () => {
            gsap.set(cactuar, { scaleX: 1, rotationY: 0 });
          },
        })
        .to(cactuar, {
          duration: 3,
          x: halfWidth - halfCactuar,
          onStart: () => {
            gsap.set(cactuar, { scaleX: -1, rotationY: 0 });
          },
        })
        .to(cactuar, {
          duration: 1,
          rotationY: 720,
          ease: "none",
        })
        .to(cactuar, {
          duration: 3,
          x: 0,
          onStart: () => {
            gsap.set(cactuar, { scaleX: -1, rotationY: 0 });
          },
        });
    });
  },
};

</script>

<style>
#app {
  display: flex;
  font-family: 'Arial', sans-serif;
  color: #f1f1f1; /* Light color for text on dark background */
  width: 100%;
  height: 100%;
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
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
  flex-direction: column; /* Stack the items vertically */
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



.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  display: flex;
  align-items: center;
}

.user-icon {
  width: 50px; /* adjust as needed */
  height: 50px; /* adjust as needed */
  margin-right: 10px; /* adjust as needed */
}

.cactuar-container {
  position: relative;
  height: 30px; /* You can adjust this as needed */
  width: 100%; /* Added this to let the cactuar move along the entire line */
  overflow: visible; /* Lets the cactuar image appear outside the bounds of its container */
}

.cactuar {
  position: absolute;
  bottom: -20px; /* adjust as needed */
  left: 0;
  height: 32px;
  width: auto;
}

@media (max-width: 600px) {
  /* On small screens, stack the sidebar and content vertically */
  #app {
    flex-direction: column;
  }

  /* Adjust the sidebar width and height */
  .sidebar {
    width: 100%;
    height: auto;
  }

  /* Stack the menu items horizontally */
  .sidebar ul {
    flex-direction: row;
    justify-content: space-around; /* Evenly distribute the items */
  }

  /* Adjust the padding on the menu items */
  .sidebar ul li {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: center;
  }

  .profile {
    width: 100%;
  }

  .info {
    margin-bottom: 10px;
  }

  .cactuar {
    height: 30px;
    width: auto;
  }

  .cactuar-container {
    width: 95%
  }

}

</style>
