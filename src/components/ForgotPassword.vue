<template>
  <div class ="grid-container">
    <div class="login-box">
      <h1>Forgot Password</h1>
      <h4 id="message">{{message}}</h4>
      <input class="form-field" placeholder="Email" id="email" v-model="email"><br>
      <button class="color-button" v-on:click="sendEmail()">Send Email</button><br>
      <router-link to="login">Login</router-link>
    </div>
  </div>
</template>

<script>
import MessageStore from "../stores/MessageStore";
import LoadingStateStore from "../stores/LoadingStateStore"
import axios from "axios";
export default {
  data: function() {
    return {
      email: "",
      message: "",
    };
  },
  created: function() {
    document.title = "Forgot Password - Owl Tutoring";
    var _this = this;
  },
  methods: {
    sendEmail: function() {
      LoadingStateStore.methods.addLoading();
      var _this = this;
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/sendRecoveryEmail",
          {
            email: _this.email,
          }
        )
        .then(function(response) {
          LoadingStateStore.methods.removeLoading();
          // JSON responses are automatically parsed.
          console.log(response);
          _this.message = response.data.message;
          MessageStore.methods.showMessage(response.data.message, false);
        })
        .catch(function(e) {
          LoadingStateStore.methods.removeLoading();
          console.log(e);
          _this.message = e.response.data.message;
          MessageStore.methods.showMessage(e.response.data.message, true);
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
