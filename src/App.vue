<template>
  <div id="app">
    <h1>Owl Tutoring</h1>
    <router-link to="Home">Home</router-link>
    <router-link to="Tutors">Tutors</router-link>
    <router-link to="contact">Contact</router-link>
    <div v-if="loggedIn">
      <router-link to="account">Account</router-link>
    </div>
    <div v-else>
      <router-link to="login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      loggedIn: false
    };
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
