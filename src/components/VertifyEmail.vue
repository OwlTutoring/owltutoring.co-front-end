<template>
  <div class ="grid-container">
    <div class="login-box">
      <h1>Vertify Email</h1>
      Check your email {{AccountStore.account.email}} and click the link to vertify your email.
      <button class="color-button" v-on:click="resendEmail()">Resend Vertification Email</button><br>
      <button v-if="AccountStore.account == null" class="color-button" v-on:click="login()">Login</button><br>
      <router-link to="signUp">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import AccountStore from "../stores/AccountStore";
import MessageStore from "../stores/MessageStore";
import axios from "axios";
export default {
  data: function() {
    return {
      AccountStore: AccountStore.data,
    };
  },
  props: {
    nextPage: {
      type: String,
      default: null
    }
  },
  created: function() {
    document.title = "Vertify Email - Owl Tutoring";
    var _this = this;
    if(this.$route.query.key && this.$route.query.email) {
        axios
        .get(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/vertifyEmail?email=" + this.$route.query.email + "&key=" + this.$route.query.key,
        {
          token: localStorage.getItem("token"),
        })
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message, false);
          MessageStore.methods.showMessage("Email Vertified", false);
          console.log(_this.nextPage);
          AccountStore.methods.refreshAccount();
          if(AccountStore.data.account != null && !AccountStore.data.account.emailVertified) {
            AccountStore.data.account.emailVertified = true;
          }
          _this.$router.push({ path: "/" + (_this.nextPage != null ? _this.nextPage : "") + ((_this.nextPage != null && _this.nextPage.toLowerCase() == "sessions") ? "?addNew=true" : "") });
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
        });
      }
    if(AccountStore.data.account != null && AccountStore.data.account.emailVertified) {
      MessageStore.methods.showMessage("Email Vertified", false);
      _this.$router.push({ path: "/" + (_this.nextPage != null ? _this.nextPage : "") + (_this.nextPage.toLowerCase() == "sessions" ? "?addNew=true" : "") });
    }
  },
  methods: {
    resendEmail: function() {
      var _this = this;
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/resendEmailVertification",
        {
          token: localStorage.getItem("token"),
          nextPage: _this.nextPage
        })
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message, false);
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
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
