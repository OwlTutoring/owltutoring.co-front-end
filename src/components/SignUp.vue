<template>
  <div>
    <h1>Sign Up</h1>
    Email: <input>
    Password: <input>
    Confirm password: <input>
    first name: <input>
    last name: <input>
    <router-link to="login">Login</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
    };
  },
};
</script>

<style>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>
