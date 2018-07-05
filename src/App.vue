<template>
  <div id="app">
    <div id="content">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,8e 00" rel="stylesheet">
      <div :class="['alert', { errorAlert: messageStore.isError }]" v-if="messageStore.show">
        {{messageStore.message}}
      </div>
      <div class="head">
        <div class="title-container">
          <img class="logo" src="../static/owl.png">
          <h1 class="title">Owl Tutoring</h1>
        </div>
        <div class="nav-grid" v-if="AccountStore.loggedIn">
          <router-link class= "nav-item nav-link" to="/">Home</router-link>
          <router-link class= "nav-item nav-link" to="/Tutors">Tutors</router-link>
          <router-link class= "nav-item nav-link" to="/contact">Contact</router-link>
          <router-link class= "nav-item nav-link" to="/account">Account</router-link>
          <router-link class= "nav-item nav-link" to="/sessions">Sessions</router-link>
          <button class= "nav-item color-button" v-on:click="logout()">logout</button>  
        </div>
        <div class="nav-grid" v-else>
          <router-link class= "nav-item nav-link" to="/">Home</router-link>
          <router-link class= "nav-item nav-link" to="Tutors">Tutors</router-link>
          <router-link class= "nav-item nav-link" to="contact">Contact</router-link>
          <router-link class= "nav-item nav-link" to="SignUp">Sign Up</router-link>
          <router-link class= "nav-item nav-link" to="login">Login</router-link>
        </div>
      </div>
      <router-view/>
    </div>
    <footer>Owl Tutoring {{year}}</footer>
  </div>
</template>

<script>
import AccountStore from "./stores/AccountStore";
import MessageStore from "./stores/MessageStore";

export default {
  name: "app",
  data: function() {
    return {
      AccountStore: AccountStore.data,
      messageStore: MessageStore.data,
      year: new Date().getFullYear()
    };
  },
  methods: {
    logout: function() {
      AccountStore.methods.logout();
    }
  },
  created: function() {
    AccountStore.methods.refreshLoginState();
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
}
#content {
  min-height: 100vh;
}
body {
  margin: 0;
  
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
  border: none;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  
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
}
.light-button {
  border-width: 0.1em;
  padding: 0.3em 2em;
  border-radius: 0.2em;
  background-color: white;
  border-style: solid;
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
  animation: popInOut 3.1s ease-in-out backwards 1;
}
.errorAlert {
  background-color: tomato;
}
.logo {
  width:5em;
  height:5em;
}
input {
  font-family: 'Montserrat', sans-serif;
}
a {
  color: inherit;
}
.title-container {
  display:flex;
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
}
footer {
  color: white;
  background-color: black;
  text-align: center;
  padding: 2em;
}
</style>
