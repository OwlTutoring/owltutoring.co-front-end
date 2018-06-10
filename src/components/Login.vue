<template>
  <div>
    <h1>Login</h1>
    <h4 id="message"></h4>
    Email: <input id="email"><br>
    Password: <input type="password" id="password"><br>
    <button v-on:click="login()">Login</button><br>
    <router-link to="signUp">Sign Up</router-link>
  </div>
</template>

<script>
import LoginStateStore from "../stores/LoginStateStore";
import MessageStore from "../stores/MessageStore";
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
          LoginStateStore.methods.login(response.data.token);
          document.getElementById("message").innerHTML = response.data.message;
          MessageStore.methods.showMessage(response.data.message);
        })
        .catch(function(e) {
          console.log(e);
          document.getElementById("message").innerHTML = e.response.data.message;
          MessageStore.methods.showMessage(e.response.data.message);
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
