<template>
  <div>
    <h1>Sign Up</h1>
    <h4 id="message"></h4>
    <select id="accountType">
      <option value="none">Select Account Type</option>
      <option value="Client">Student</option>
      <option value="Tutor">Tutor</option>
    </select>
    first name: <input id="firstName">
    last name: <input id="lastName">
    Email: <input id="email">
    Phone Number: <input id="phone">
    Password: <input id="password" type="password">
    Confirm password: <input id="confirmPassword" type="password">
    <button v-on:click="signUp()">SignUp</button>
    <router-link to="login">Login</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {};
  },
  methods: {
    signUp: function() {
      if(document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById("message").innerHTML = "Error, Passwords don't match";
        return;
      }
      if(document.getElementById("accountType").value == "none") {
        document.getElementById("message").innerHTML = "please select an account type";
        return;
      }
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/signUp",
          {
            accountType: document.getElementById("accountType").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            phone: document.getElementById("phone").value,
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          document.getElementById("message").innerHTML = response.data.message;
        })
        .catch(function(e) {
          console.log(e);
          document.getElementById("message").innerHTML = e.response.data.message;
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
