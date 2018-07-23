<template>
  <div class ="grid-container">
    <div class="login-box">
      <h1>Change Password</h1>
      <h4 id="message">{{message}}</h4>
      <input class="form-field" placeholder="New Password" id="password" v-model="password" type="password"><br>
      <input class="form-field" placeholder="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password"><br>
      <button class="color-button" v-on:click="changePassword()">Change Password</button><br>
      <router-link to="login">Login</router-link>
    </div>
  </div>
</template>

<script>
import MessageStore from "../stores/MessageStore";
import LoadingStateStore from "../stores/LoadingStateStore";
import axios from "axios";
export default {
  data: function() {
    return {
      password: "",
      confirmPassword: "",
      message: "",
    };
  },
  created: function() {
    document.title = "Change Password - Owl Tutoring";
    var _this = this;
  },
  methods: {
    changePassword: function() {
      var _this = this;
      if(this.password != this.confirmPassword) {
        this.message = "Error Passwords do not match";
      }
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/changePassword",
          {
            password: _this.password,
            token: localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          _this.message = response.data.message;
          MessageStore.methods.showMessage(response.data.message, false);
          LoadingStateStore.methods.removeLoading();
        })
        .catch(function(e) {
          console.log(e);
          _this.message = e.response.data.message;
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
