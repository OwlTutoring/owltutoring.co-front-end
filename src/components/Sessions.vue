<template>
  <div class="sessions-container">
    <h1>Sessions</h1>
    <router-link :to="{ name: 'sessions', params: { display: 'future' }}">Schedueled</router-link>
    <router-link :to="{ name: 'sessions', params: { display: 'history' }}">Passed</router-link>
    <router-link :to="{ name: 'sessions', params: { display: 'canceled' }}">Canceled</router-link>
    {{Math.round(parseFloat(AccountStore.account.balance)/2500*100)/100 }} Lessons Credits
    <router-link class="plain-button" to="pay">Buy More Lessons</router-link>
    <button class="color-button" @click="makeSession()">New Session</button>
    <div ><Session v-for="session in displaySessions" :key="session.ID" @refresh="refresh" v-on:cancelNew="removeSession($event)" :session="session" /></div>
  </div>
</template>

<script>
import Session from "./Session.vue";
import axios from "axios";
import MessageStore from "../stores/MessageStore";
import AccountStore from "../stores/AccountStore";
export default {
  props: {
    display: {
      type: String,
      default: "future"
    }
  },
  components: {
    Session
  },
  data: function() {
    return {
      sessions: [],
      AccountStore: AccountStore.data
    };
  },
  computed: {
    displaySessions: function() {
      console.log(this.display);
      var currentTime = new Date().getTime();
      if (this.display == "future") {
        return this.sessions.filter(function(session) {
          return (
            (parseInt(session.endTime) > currentTime &&
              session.canceled == false) ||
            session.isnew
          );
        });
      } else if (this.display == "history") {
        return this.sessions.filter(function(session) {
          return (
            (parseInt(session.endTime) < currentTime &&
              session.canceled == false) ||
            session.isnew
          );
        });
      } else if (this.display == "canceled") {
        return this.sessions.filter(function(session) {
          return session.canceled == true || session.isnew;
        });
      }
    }
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
        function compare(a, b) {
          if (parseInt(a.startTime) < parseInt(b.startTime)) return -1;
          if (parseInt(a.startTime) > parseInt(b.startTime)) return 1;
          return 0;
        }
        _this.sessions = _this.sessions
          .concat(response.data.sessions)
          .sort(compare);
      })
      .catch(function(e) {
        console.log(e);
        MessageStore.methods.showMessage(e.response.data.message);
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
          function compare(a, b) {
            if (parseInt(a.startTime) < parseInt(b.startTime)) return -1;
            if (parseInt(a.startTime) > parseInt(b.startTime)) return 1;
            return 0;
          }
          _this.sessions = response.data.sessions.sort(compare);
          console.log(_this.sessions);
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message);
          //this.errors.push(e)
        });
    },
    makeSession: function() {
      this.sessions.unshift({
        ID: parseInt(Math.random() * 100000000000),
        isnew: true,
        startTime: new Date().getTime()
      });
    },
    removeSession: function(removeID) {
      this.sessions = this.sessions.filter(function(session) {
        return session.ID != removeID;
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
.sessions-container {
  margin: 1% 10%;
}
</style>
