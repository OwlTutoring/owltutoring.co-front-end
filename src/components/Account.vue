<template>
<div>
  <h1>Account</h1>
  <div v-if="AccountStore.account != null" >
  <h1>{{AccountStore.account.firstName}} {{AccountStore.account.lastName}}</h1>
    <h4>Phone: {{AccountStore.account.phone}}</h4>
    <h4>Email: {{AccountStore.account.email}}</h4>
    <h4>Balance: {{AccountStore.account.balance}}</h4>
  </div>
  <div v-else>
    Please Login
    <router-link class= "nav-item nav-link" to="login">Login</router-link>
  </div>
</div>
</template>

<script>
import axios from "axios";
import AccountStore from "../stores/AccountStore";
export default {
  data: function() {
    return {
      AccountStore: AccountStore.data
    };
  },
  created: function() {
    console.log(AccountStore);
    if (AccountStore.data.account == null) {
      AccountStore.methods.refreshAccount();
    }
  }
};
</script>

