<template>
  <div id="app">
    <h1>Owl Tutoring</h1>
    <router-link to="Home">Home</router-link>
    <router-link to="Tutors">Tutors</router-link>
    <router-link to="contact">Contact</router-link>
    <div v-if="LoginStateStore.loggedIn">
      <router-link to="account">Account</router-link>
      <router-link to="sessions">Sessions</router-link>
      <button v-on:click="logout()">logout</button>
    </div>
    <div v-else>
      <router-link to="login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import LoginStateStore from "./stores/LoginStateStore";

export default {
  name: "app",
  data: function() {
    return {
      LoginStateStore: LoginStateStore.data,
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
