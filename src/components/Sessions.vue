<template>
<div class="grid-margin-container">
  <div class="sessions-container">
    <h1>Sessions</h1>
    <div v-if="AccountStore.account != null" >
      <div class="nav-grid">
      <router-link class="nav-link nav-item" :to="{ name: 'sessions', params: { display: 'future' }}">Schedueled</router-link>
      <router-link class="nav-link nav-item" :to="{ name: 'sessions', params: { display: 'history' }}">History</router-link>
      <router-link class="nav-link nav-item" :to="{ name: 'sessions', params: { display: 'canceled' }}">Canceled</router-link>
      </div>
      <div class="ui-grid">
        <div class="balance"><div v-if="AccountStore.account.accountType == 'Client'">{{Math.round(parseFloat(AccountStore.account.balance)/2500*100)/100 }} Lessons Credits</div><div v-else>You are a tutor.</div></div>
        <router-link class="moreLessons plain-button" to="pay">Buy More Lessons</router-link>
        <button class="makeSession color-button" @click="makeSession()">New Session</button>
      </div>
      <div v-if="displaySessions == 0">
        <h2 class="list-message">No Sessions</h2>
      </div>
      <div ><Session v-for="session in displaySessions" :key="session.ID" @refresh="refresh" v-on:cancelNew="removeSession($event)" :session="session" /></div>
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
import Session from "./Session.vue";
import axios from "axios";
import MessageStore from "../stores/MessageStore";
import AccountStore from "../stores/AccountStore";
import LoadingStateStore from "../stores/LoadingStateStore";

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
    document.title = "Sessions - Owl Tutoring";
    var _this = this;
    if (AccountStore.data.account == null) {
      AccountStore.methods.refreshAccount(function() {
        if(AccountStore.data.account && !AccountStore.data.account.emailVertified) {
          console.log("Account not vertified");
          _this.$router.push({ path: "/VertifyEmail/Sessions"});
        }
      });
    }
    LoadingStateStore.methods.addLoading();
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getSessions",
        { token: localStorage.getItem("token") }
      )
      .then(function(response) {
        LoadingStateStore.methods.removeLoading();
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
        LoadingStateStore.methods.removeLoading();
        console.log(e);
        MessageStore.methods.showMessage(e.response.data.message, true);
        //this.errors.push(e)
      });
  },
  methods: {
    refresh: function() {
      var _this = this;
      console.log("refresh sessions");
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getSessions",
          { token: localStorage.getItem("token") }
        )
        .then(function(response) {
          LoadingStateStore.methods.removeLoading();
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
          LoadingStateStore.methods.removeLoading();
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
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

<style scoped>
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
@media only screen and (max-device-width: 480px),  only screen and (max-width: 480px) {
  .ui-grid {
    grid-template-columns: auto;
  }
}
</style>
