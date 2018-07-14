<template>
<div class="grid-margin-container">
  <div class="container">
    <div class="nav-grid">
      <router-link class="nav-link nav-item" to="pay">Pay</router-link>
      <router-link class="nav-link nav-item" to="chargeHistory">History</router-link>
      <h2>Balance: {{"$" + AccountStore.account.balance/100}}</h2>
    </div>
    <h1>Charge History</h1>
    <div class="list-charge-container" v-if="AccountStore.account != null" >
      <list-charge v-for="charge in charges" :charge="charge" :key="charge.id"/>
      <div v-if="charges.length == 0">No previous charges</div>
      <div class="contact"> Questions or concerns? text <a href="sms://2248149291">(224) 814-9291</a></div>
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
import Vue from "vue";

Vue.component("list-charge", {
  props: ["charge"],
  template: "<div class='charge-container'><div class='charge-date'>{{dateString}}</div> <div class='charge-lessons'>{{lessonString}}</div> <div class='charge-card'>{{charge.source.card.brand}} ---- ---- ---- {{charge.source.card.last4}} {{charge.source.card.exp_month}}/{{charge.source.card.exp_year.toString().substring(2,4)}}</div> <div class='charge-amount'>${{charge.amount/100}}</div></div>",
  computed: {
    dateString: function() {
      var date = new Date(this.charge.created*1000);
      return date.getMonth().toString() +"/" + date.getDate() + "/" + date.getFullYear().toString().substring(2,4);
    },
    lessonString: function() {
      if(this.charge.metadata.numLessons == null) {
        return "";
      }
      return this.charge.metadata.numLessons.toString() + (this.charge.metadata.numLessons > 1 ? " Lessons" : " Lessson");
    }
  }
});

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
        _this.charges = response.data.charges.data

      })
      .catch(function(e) {
        console.log(e);
        MessageStore.methods.showMessage(e.response.data.message, true);
        //this.errors.push(e)
      });
  },
  methods: {
    
  }
};
</script scoped>

<style>
ul {
  padding: 0;
}
li {
  list-style: none;
}
.container {
  grid-column: 2 / 2;
  margin-bottom: 10vh;
}
.list-charge-container {
  border-top-style: solid;
  border-color:  #CCCCCC;
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
.charge-date {
  display: block;
}
.charge-amount {
  text-align: right;
  display: block;
  float:right;
}
.charge-lessons {
  display: block;
}
.charge-card {
  display: block;
}
.charge-container {
  display: flex;
  justify-content: space-between;
  padding:.5em 0;
  border-bottom-style:solid;
  border-color: #CCCCCC;
}
.contact {
  padding: 5vh 0;
  text-align: center;
}
</style>
