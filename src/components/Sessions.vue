<template>
  <div>
    <h1>Sessions</h1>
    <button @click="makeSession()">New Session</button>
    <div ><Session v-for="session in sessions" :key="session.ID" @refresh="refresh" :session="session" /></div>
  </div>
</template>

<script>
import Session from "./Session.vue";
import axios from "axios";
export default {
  components: {
    Session
  },
  data: function() {
    return {
      sessions: []
    };
  },
  mounted: function() {
    if (this.$route.query.addNew) {
      this.makeSession();
    }
  },
  created: function() {
    var _this = this;
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getSessions",
        { token: localStorage.getItem("token") }
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response);
        _this.sessions = _this.sessions.concat(response.data.sessions);
      })
      .catch(function(e) {
        console.log(e);
        //this.errors.push(e)
      });
  },
  methods: {
    refresh: function() {
      var _this = this;
      console.log("refresh sessions");
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getSessions",
          { token: localStorage.getItem("token") }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          _this.sessions = response.data.sessions;
          console.log(_this.sessions);
        })
        .catch(function(e) {
          console.log(e);
          //this.errors.push(e)
        });
    },
    makeSession: function() {
      this.sessions.push({ isnew: true, startTime: new Date().getTime() });
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
