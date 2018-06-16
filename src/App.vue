<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">
    <h1>Owl Tutoring</h1>
    {{messageStore.message}}
    <div class="nav-grid" v-if="LoginStateStore.loggedIn">
      <router-link class= "nav-item" to="Home">Home</router-link>
      <router-link class= "nav-item" to="Tutors">Tutors</router-link>
      <router-link class= "nav-item" to="contact">Contact</router-link>
      <router-link class= "nav-item" to="account">Account</router-link>
      <router-link class= "nav-item" to="sessions">Sessions</router-link>
      <button class= "nav-item" v-on:click="logout()">logout</button>  
    </div>
    <div class="nav-grid" v-else>
      <router-link class= "nav-item" to="Home">Home</router-link>
      <router-link class= "nav-item" to="Tutors">Tutors</router-link>
      <router-link class= "nav-item" to="contact">Contact</router-link>
      <router-link class= "nav-item" to="login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import LoginStateStore from "./stores/LoginStateStore";
import MessageStore from "./stores/MessageStore";

export default {
  name: "app",
  data: function() {
    return {
      LoginStateStore: LoginStateStore.data,
      messageStore: MessageStore.data,
    };
  },
  methods: {
    logout: function() {
      LoginStateStore.methods.logout();
    },
  },
  created: function() {
    LoginStateStore.methods.refresh();
  }
};
</script>

<style>
#app {
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1 {
  font-weight: 400;
}
h2 {
  font-weight: 400;
}
button {
  font-weight: 800;
  background-color: #ffb219;
  color: white;
  border-radius: .2em;
  font-size: 1em;
  padding: .3em 2em;
  border: none;
}
.nav-grid {
  display: flex;
  align-items: stretch;
  flex-direction: row;
}
.nav-item {
  display: flex;
  align-items: center;
  font-size: 1.5em;
}
</style>
