<template>
<div>
  <h1>Account</h1>
  <h1>{{account.firstName}} {{account.lastName}}</h1>
    <h4>Phone: {{account.phone}}</h4>
    <h4>Email: {{account.email}}</h4>
</div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      account: {}
    };
  },
  created: function() {
    var _this = this;
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getAccountInfo",
        { token: localStorage.getItem("token") }
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response);
        _this.account = response.data;
      })
      .catch(function(e) {
        console.log(e);
        //this.errors.push(e)
      });
  }
};
</script>

