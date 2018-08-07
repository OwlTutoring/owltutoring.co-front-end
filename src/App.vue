<template>
  <div id="app">
    <head>
      <title>Owl Tutoring</title>
    </head>
    <div id="content" v-on:click="showPopUp = false">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,8e 00" rel="stylesheet">
      <div :class="['alert', { errorAlert: messageStore.isError }]" v-if="messageStore.show">
        {{messageStore.message}}
      </div>
      <transition name="fade">
        <div v-if="LoadingStateStore.loading > 0" id="loading-book">      
          <div class="page" id="page-a">
          </div>
          <div class="page" id="page-b">
          </div>
          <div class="page" id="page-c">
          </div>
          <div class="page" id="page-d">
          </div>
          <div class="page" id="page-e">
          </div>
          <div class="cover" id="cover-a">
          </div>
          <div class="cover" id="cover-b">
          </div>
          <div id="binding">
          </div>
          <div id="loading">
          Loading <div class="dot" id="dot-a">.</div><div class="dot" id="dot-b">.</div><div class="dot" id="dot-c">.</div>
          </div>
        </div>
      </transition>
      <div class="head" id="head">
        
          <div class="box-shadow-menu" v-on:click="toggleMenu()"></div>
        <router-link class="title-link" to="/">
        <div class="title-container">
          <img class="logo" id="nav-logo" src="https://github.com/Owltutoring/WebsiteImages/blob/master/owl.png?raw=true">
          <h1 class="title" id="nav-title">Owl Tutoring</h1> 
        </div>
        </router-link>
         
        <div class="nav-grid menu-grid" v-if="AccountStore.account != null && showMenu" v-on:click="adjustSize()">
          <router-link class= "nav-item menu-item nav-link" to="/">Home</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/Tutors">Tutors</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/account">Account</router-link>
          <router-link v-if="AccountStore.account.accountType == 'Tutor' && !AccountStore.account.done" class= "nav-item menu-item nav-link" to="/tutorProfile">Apply</router-link>
          <router-link v-if="AccountStore.account.accountType == 'Tutor' && AccountStore.account.done" class= "nav-item menu-item nav-link" to="/tutorProfile">Profile</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/sessions">Sessions</router-link>
          <button class= "nav-item menu-item color-button" v-on:click="logout()">logout</button> 
        </div>
        <div class="nav-grid menu-grid" v-else-if="showMenu" v-on:click="adjustSize()">
          <router-link class= "nav-item menu-item nav-link" to="/">Home</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/Tutors">Tutors</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/SignUp">Sign Up</router-link>
          <router-link class= "nav-item menu-item nav-link" to="/login">Login</router-link>
        </div>
          
      </div>
      <div class="popUp" v-if="showPopUp">
        Welcome to the new Owl Tutoring website! With our new site we hope to provide you a better experience. We are currently transitioning from our old site. If you are a customer looking to pay or schedule a lesson please use our old website <a href="https://owltutoring.squarespace.com">owltutoring.squarespace.com</a> for the moment. If you are looking to sign up as a tutor please do so on this site. Thank You for your patience.<br> -The Owl Tutoring Dev Team.
      </div>
      <router-view/>
    </div>
    <footer>
      <div><a href="mailto:general@owltutoring.co">general@owltutoring.co</a></div>
      <div>Owl Tutoring {{year}}</div>
      <div> text <a href="sms://2248149291">(224) 814-9291</a></div>
    </footer>
  </div>
</template>

<script>
import AccountStore from "./stores/AccountStore";
import MessageStore from "./stores/MessageStore";
import LoadingStateStore from "./stores/LoadingStateStore";

window.onscroll = function() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop;
  if(distanceY > 70) {
    document.getElementById("nav-logo").classList.add("small-logo");
    document.getElementById("head").classList.add("shrunk-head");
    document.getElementById("nav-title").classList.add("shrunk-title");
  } 
  if(distanceY < 20) {
    document.getElementById("nav-logo").classList.remove("small-logo");
    document.getElementById("head").classList.remove("shrunk-head");
    document.getElementById("nav-title").classList.remove("shrunk-title");
  }
  
}


export default {
  name: "app",
  data: function() {
    return {
      AccountStore: AccountStore.data,
      messageStore: MessageStore.data,
      LoadingStateStore: LoadingStateStore.data,
      year: new Date().getFullYear(),
      showPopUp: true,
      showMenu: true,
    };
  },
  methods: {
    toggleMenu: function() {
      console.log(this.showMenu);
      if(this.showMenu) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    },
    logout: function() {
      AccountStore.methods.logout();
    },
    adjustSize: function() {
      console.log("adjust");
      if (window.matchMedia("(max-device-width: 480px)").matches || window.matchMedia("(max-width: 480px)").matches) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    },
  },
  created: function() {
    LoadingStateStore.methods.removeLoading();
    AccountStore.methods.refreshAccount();

    this.adjustSize() // Call listener function at run time
    window.matchMedia("(max-device-width: 480px)").addListener(this.adjustSize) // Attach listener function on state changes
    window.matchMedia("(max-width: 480px)").addListener(this.adjustSize)
  }
};
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  font-size: 2vh;
}
.grid-margin-container {
  display: grid;
  grid-auto-columns: auto auto auto;
  margin: 0;
}
.after-margin {
  grid-column: 3 / 3;
}
#content {
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  
}
h1 {
  font-weight: 400;
}
h2 {
  font-weight: 400;
}
.color-button {
  background-color: #ffb219;
  color: white;
  border-radius: 0.2em;
  font-size: 1em;
  padding: 0.3em 2em;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  border-color: #ffb219;
  border-width: 0.1em;
  border-style: solid;
  display: inline-block;
}
.plain-button {
  font-family: 'Montserrat', sans-serif;
  background-color: white;
  color: black;
  border-radius: 0.2em;
  font-size: 1em;
  padding: 0.3em 2em;
  border: solid;
  border-color: grey;
  border-width: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
}
.light-button {
  border-width: 0.1em;
  padding: 0.3em 2em;
  border-radius: 0.2em;
  border-color: #cccccc;
  border-style: solid;


  background-color: white;
  border-radius: 0.2em;
  font-size: 1em;
  padding: 0.3em 2em;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
}
.nav-grid {
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  align-items: center;
  font-size: 1.5em;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-link:hover {
  color: grey;
}
.alert {
  position: fixed;
  padding: 0.3em;
  font-size: 1.5em;
  border-radius: 0.5em;
  background-color: lime;
  width: 50%;
  margin-top: 5vh;
  margin-left: 25%;
  margin-right: 50%;
  text-align: center;
  color: white;
  animation: popInOut 5.1s ease-in-out backwards 1;
  z-index: 50;
}
.errorAlert {
  background-color: tomato;
}
#nav-title {

}
.shrunk-title {
  display: none;
  width: 0;
}
#nav-logo {
  -webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	-ms-transition: all 0.3s;
	-o-transition: all 0.3s;
	transition: all 0.3s;
}
.logo {
  width:5em;
  height:5em;
  z-index: 5;
}
.small-logo {
  width:3em;
  height:3em;
}
input {
  font-family: 'Montserrat', sans-serif;
}
a {
  color: inherit;
}
.title-container {
  display: flex;
}
.title-link {
  text-decoration: none;
}
@keyframes popInOut {
  100% {
    transform: translateY(-200px);
  }
  80% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(0px);
  }
  0% {
    transform: translateY(-50vh);
  }
}
.head {
  background-color: black;
  color: white;
  margin: 0;
  padding: 1em;
  padding-bottom: 1.5em;
  margin: 0;
  z-index: 6;
  position: -webkit-sticky; /* Safari */
  position: sticky;
    top: 0;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  -webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	-ms-transition: all 0.3s;
	-o-transition: all 0.3s;
	transition: all 0.3s;
}
.shrunk-head {
  grid-template-rows: auto;
  grid-template-columns: min-content auto;
}
footer {
  color: white;
  background-color: black;
  text-align: center;
  padding: 2em;
  display:flex;
  justify-content: space-around;
}
.form-field {
  font-size: 1.2em;
  padding: 7px;
  border-style: solid;
  border-radius: 5px;
  border-color: #cccccc;
  border-width: 2px;
}


/*Loading animation */
#loading-book {
  background-color: white;
  display: block;
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
}
#loading {
  position: absolute;
  display: block;
  width: 100vw;
  transform: translate(0, calc(51vh + 1em));
  text-align: center;
  animation: quick-hide 3s ease-in-out forwards infinite;
  animation-delay: 1.8s;
}
#binding {
  width: 1vh;
  height: 1vh;
  border-radius: .5vh;
  display: block;
  background-color: orange;
  position: absolute;
  transform: translate(calc(50vw - .5vh), 50vh);
  transform-origin: center center;
}
.dot {
  display: inline;
  animation: dot 1s ease-in-out alternate infinite;
}
#dot-a {
  animation-delay: 0s;
}
#dot-b {
  animation-delay: .3s;
}
#dot-c {
  animation-delay: .6s;
}
.cover {
  width: 10vh;
  height: 1vh;
  background-color: orange;
  display: block;
  position: absolute;
  border-radius: .5vh;
  transform: translate(calc(50vw - 10vh), 50vh);
}
#cover-a {
  transform: translate(calc(50vw - 10vh), 50vh) rotate(180deg);
  transform-origin: center right;
  animation: rotate-cover-a 3s ease-in-out forwards infinite;
    animation-delay: 1.8s;
}
#cover-b {
  transform: translate(calc(50vw - 10vh), 50vh) rotate(0deg);
  transform-origin: center right;
  animation: rotate-cover-b 3s ease-in-out forwards infinite;
  animation-delay: 1.8s;
}
.page {
  width: 9vh;
  height: .5vh;
  background-color: black;
  position: absolute;
  transform-origin: center right;
  transform: translate(calc(50vw - 9vh), 50vh);
  animation: rotate-page 3s ease-in-out forwards infinite;
}
#page-a {
  animation-delay: .3s;
}
#page-b {
  animation-delay: .6s;
}
#page-c {
  animation-delay: .9s;
}
#page-d {
  animation-delay: 1.2s;
}
#page-e {
  animation-delay: 1.5s;
}
@keyframes rotate-page {
  40% {
    transform: translate(calc(50vw - 9vh), 50vh) rotate(179deg);
    background-color: black;
  }
  41% {
    background-color: transparent;
  }
  100%{
    background-color: transparent;
  }
}

@keyframes rotate-cover-a {
  
  40% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(180deg); 
  }
  50% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(360deg);
  }
  80% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(540deg);
  }
  100% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(540deg);
  }
}

@keyframes rotate-cover-b {
  40% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(180deg); 
  }
  50% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(360deg);
  }
  100% {
    transform: translate(calc(50vw - 10vh), 50vh) rotate(360deg);
  }
}

@keyframes dot {
  to {
    color: white;
  }
}
@keyframes quick-hide {
  30% {
    color: inherit;
  }
  45% {
    color: white;
  }
  50% {
    color: white;
  }
  55% {
    color: white;
  }
  70% {
    color: inherit;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.popUp {
  position: absolute;
  top: 0;
  background-color: white;
  z-index: 20;
  font-size: 2em;
  padding: 1vw;
  margin: 1vw;
}
.indent-list { 
  padding-left: 1em;   
}
.box-shadow-menu {
  display: none;
}
@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
  .menu-grid {
    flex-direction: column;
    align-items:flex-end;
    font-size: 2em;
    padding-top: 3em;
    position: absolute;
    background-color: black;
    width: 95vw;
    padding-right: 5vw;
    padding-bottom: 5vw;
    z-index: 0;
    
  }
  .head {
    grid-auto-columns: auto auto;
  }
  .box-shadow-menu {
    display: block;
    position: absolute;
    top: 1.5em;
    right: 5vw;
    width: 3em;
    height: 3em;
    z-index: 1;
  }
  .box-shadow-menu:before {
    content: "";
    position: absolute;
    width: 3em;
    height: 0.4em;
    background: white;
    box-shadow: 
      0 0.9em 0 0 white,
      0 1.8em 0 0 white;
  }
  .alert {
    width: 90%;
    margin-left: 2.5%;
  }
  .grid-margin-container {
    grid-auto-columns: 5vw auto 5vw;
  }
}
</style>
