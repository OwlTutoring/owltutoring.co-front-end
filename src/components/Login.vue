<template>
  <div>
    <h1>Login</h1>
    Email: <input id="email">
    Password: <input type="password" id="password">
    <button v-on:click="login()">Login</button>
    <router-link to="signUp">Sign Up</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {};
  },
  created: function() {
    var _this = this;
  },
  methods: {
    login: function() {
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/login",
          {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          localStorage.setItem('token', response.data.token);
        })
        .catch(function(e) {
          console.log(e);
          //this.errors.push(e)
        });
    }
  }
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
