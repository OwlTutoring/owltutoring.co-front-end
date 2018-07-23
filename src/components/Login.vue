<template>
  <div class ="grid-container">
    <div class="login-box">
      <h1>Login</h1>
      <h4 id="message"></h4>
      <input class="form-field" placeholder="Email" id="email"><br>
      <input class="form-field" placeholder="Password" type="password" id="password" @keyup.enter="login"><br>
      <button class="color-button" v-on:click="login()">Login</button><br>
      <router-link to="signUp">Sign Up</router-link>
      <router-link to="forgotPassword">Forgot Password?</router-link>
    </div>
  </div>
</template>

<script>
import AccountStore from "../stores/AccountStore";
import MessageStore from "../stores/MessageStore";
import LoadingStateStore from "../stores/LoadingStateStore";
import axios from "axios";
export default {
  props: {
    nextPage: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {};
  },
  created: function() {
    document.title = "Login - Owl Tutoring";
    var _this = this;
  },
  methods: {
    login: function() {
      var _this = this;
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/login",
          {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            connectAccountID: _this.$route.query.connectAccountID
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          AccountStore.methods.login(response.data.token);
          document.getElementById("message").innerHTML = response.data.message;
          MessageStore.methods.showMessage(response.data.message, false);
          LoadingStateStore.methods.removeLoading();
          console.log("/" + (_this.nextPage != null ? _this.nextPage : ""));
          _this.$router.push({ path: "/" + (_this.nextPage != null ? _this.nextPage : "") + (_this.nextPage == "sessions" ? "?addNew=true" : "") });
        })
        .catch(function(e) {
          console.log(e);
          document.getElementById("message").innerHTML = e.response.data.message;
          MessageStore.methods.showMessage(e.response.data.message, true);
          LoadingStateStore.methods.removeLoading();
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
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.login-box {
  grid-column-start: 2;
  grid-column-end: 3;
  display: grid;
  text-align: center;
  border-style: solid;
  border-width: .1em;
  border-radius: 1.5em;
  padding: 2em;
  margin-top: 10%;
  border-color: gray;
}
.form-field {
  padding: .2em;
  font-size: 1.5em;
  border-radius: .2em;
  border-style: solid;
  border-color: gray;
}

</style>
