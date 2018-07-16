<template>
<div class="account">
  <h1>Account</h1>
  <div v-if="AccountStore.account != null" >
    <h1>{{AccountStore.account.firstName}} {{AccountStore.account.lastName}}</h1>
    <h4>Phone: {{formatedPhone}}</h4>
    <h4>Email: {{AccountStore.account.email}}</h4>
    <h4>Balance: {{"$" + AccountStore.account.balance/100}}</h4>
    <router-link class= "" to="changePassword">Change Password</router-link>
    <br>
    <br>
    <div v-if="!AccountStore.account.emailVertified">
      <router-link class= "color-button" to="VertifyEmail">Vertify Email</router-link>
      <br>
      <br>
    </div>
    <div v-if="AccountStore.account.accountType == 'Tutor'">
      <router-link class= "color-button" to="tutorProfile">Edit Tutor Profile</router-link>
    </div>
    <div v-else>
      <router-link class= "color-button" to="pay">Buy More Lessons</router-link>
    </div>
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
    document.title = "Account - Owl Tutoring";
    console.log(AccountStore);
    if (AccountStore.data.account == null) {
      AccountStore.methods.refreshAccount();
    }
  },
  computed: {
    formatedPhone: function() {
      var phoneString = AccountStore.data.account.phone;
      return phoneString.length == "10" ? "(" + phoneString.substring(0,3) + ") " + phoneString.substring(3,6) + "-" + phoneString.substring(6,10) : phoneString.substring(0, 1) + " (" + phoneString.substring(1,4) + ") " + phoneString.substring(4,7) + "-" + phoneString.substring(7,11); 
    }
  }
};
</script>

<style scoped>
.account {
  margin: 5vw;
}
</style>

