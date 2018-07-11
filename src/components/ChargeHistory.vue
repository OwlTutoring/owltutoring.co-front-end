<template>
<div class="grid-margin-container">
  <div class="container">
    <div class="nav-grid">
        <router-link class="nav-link nav-item" :to="{ name: 'pay', params: { display: 'pay' }}">Pay</router-link>
        <router-link class="nav-link nav-item" :to="{ name: 'pay', params: { display: 'history' }}">History</router-link>
        <h2>Balance: {{"$" + AccountStore.account.balance/100}}</h2>
      </div>
    <h1>Charge History</h1>
    <div v-if="AccountStore.account != null" >
    </div>
    <div v-else>
      Please Login
      <router-link class= "nav-item nav-link" to="login">Login</router-link>
    </div>
  </div>
  <div class="after-margin"></div>
</div>
</template>

<script>
import axios from "axios";
console.log("waha");
import MessageStore from "../stores/MessageStore";
import AccountStore from "../stores/AccountStore";
export default {
  data: function() {
    return {
      charges: [],
      AccountStore: AccountStore.data
    };
  },
  created: function() {
    document.title = "Charge History - Owl Tutoring";
    var _this = this;
    if (AccountStore.data.account == null) {
      AccountStore.methods.refreshAccount();
    }
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/chargeHistory",
        { token: localStorage.getItem("token") }
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response);

      })
      .catch(function(e) {
        console.log(e);
        MessageStore.methods.showMessage(e.response.data.message, true);
        //this.errors.push(e)
      });
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
.sessions-container {
  grid-column: 2 / 2;
}
.ui-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1vw;
  padding: 3vw;
}
.balance {
  font-weight: 800;
  font-size: 1.2em;
}
.list-message {
  text-align: center;
}
</style>
