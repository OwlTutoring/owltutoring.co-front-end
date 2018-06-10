<template>
  <div class = "session-container">
    <div v-if="!!editing">
      <div id="message">New Session</div>
      <input v-model="hour" id="hour">:<input v-model.lazy="minute" id="minute"> <select v-model="AMPM" id="AMPM">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
      </select>
      <input v-model="calendar.selected" id="day">/<input v-model="calendar.month" id="month">/<input v-model="calendar.year" id="year">
      <div v-if="showCalander" class="calendar-container"><h2><button @click="backMonth()"> < </button>{{getMonth}}<button @click="forwardMonth()"> > </button></h2><div v-for="day in days" v-on:click="selectDay(day)" v-bind:class="{'selected':day == calendar.selected }" class="calendar-day">{{day}}</div> </div>
      <input v-model="length" id="length">hr(s)
      <select v-model="tutorID" id="tutor">
      <option v-for="account, i  in relatedAccounts" :value="account.ID.N">{{account.firstName.S}} {{account.lastName.S}}</option>
      <option value="findMore">Find more Tutors</option>
      </select>
    <div v-if="session.isnew">
      <button @click="scheduleLesson()">Schedule Lesson</button>
    </div>
    <div v-else>
      <button @click="editLesson()">Save Changes</button>
    </div>
    <button @click="cancelEdit()">Cancel</button>
    </div>
    <div v-else>
    <h2>{{dateTimeString}}</h2>
    {{session.name}}
    <button v-on:click="changeToEdit()">Edit</button>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    session: {
      type: Object,
      edit: false
    }
  },
  name: "Session",
  data: function() {
    return {
      tutorID: null,
      editing: false,
      showCalander: true,
      calendar: {
        selected: this.session.isnew
          ? new Date().getDate() + 1
          : new Date(parseInt(this.session.startTime)).getDate() + 1,
        month: this.session.isnew
          ? new Date().getMonth() + 1
          : new Date(parseInt(this.session.startTime)).getMonth() + 1,
        year: this.session.isnew
          ? new Date().getFullYear()
          : new Date(parseInt(this.session.startTime)).getFullYear()
      },
      hour: this.session.isnew
        ? 5
        : new Date(parseInt(this.session.startTime)).getHours(),
      minuteVal: this.session.isnew
        ? 0
        : new Date(parseInt(this.session.startTime)).getMinutes(),
      AMPM: "PM",
      length: 1,
      relatedAccounts: [],
    };
  },
  created: function() {
    var _this = this;
    if (this.session.isnew) {
      this.editing = true;
    }
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getRelatedAccountInfo",
        {
          token: localStorage.getItem("token")
        }
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response.data);
        _this.relatedAccounts = response.data.accounts;
        _this.tutorID = _this.relatedAccounts[0].ID.N;
      })
      .catch(function(e) {
        console.log(e);
        //this.errors.push(e)
      });
  },
  computed: {
    minute: {
      get: function() {
        return this.minuteVal < 10 ? "0" + this.minuteVal : this.minuteVal;
      },
      set: function(newVal) {
        this.minuteVal = newVal;
      }
    },
    days: function() {
      var lengths = [
        31,
        (this.calendar.year % 4 == 0 && this.calendar.year % 100 != 0) ||
        this.calendar.year % 400 == 0
          ? 29
          : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ];
      console.log(lengths[this.calendar.month - 1]);
      return lengths[this.calendar.month - 1];
    },
    getMonth: function() {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      console.log(months[this.calendar.month - 1]);
      //document.getElementById("month").value = this.calendar.month + 1;
      return months[this.calendar.month - 1];
    },
    dateTimeString: function() {
      var date = new Date(parseInt(this.session.startTime));
      var days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
      var AMPM = "AM";
      var hours = date.getHours();
      if (hours > 12) {
        AMPM = "PM";
        hours -= 12;
      }
      if (hours == 0) {
        hours = 12;
      }
      // 4:30PM Monday, 4/6/2018
      return (
        hours +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        AMPM +
        " " +
        days[date.getDay()] +
        " " +
        date.getMonth() +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear()
      );
    }
  },
  methods: {
    scheduleLesson: function() {
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/createSession",
          {
            token: localStorage.getItem("token"),
            clientID: 1,
            tutorID: 1,
            startTime: 1,
            endTime: 1,
            sessionLocation: 1
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          document.getElementById("message").innerHTML = response.data.message;
        })
        .catch(function(e) {
          console.log(e);
          document.getElementById("message").innerHTML =
            e.response.data.message;
          //this.errors.push(e)
        });
    },
    cancelEdit: function() {
      this.editing = false;
    },
    changeToEdit: function() {
      console.log(this.editing);
      this.editing = true;
      console.log(this.editing);
    },
    toggleMore: function() {
      console.log(this.expanded);
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    },
    selectDay: function(day) {
      console.log(day);
      this.calendar.selected = day;
      document.getElementById("day").value = day;
    },
    backMonth: function() {
      if (this.calendar.month == 1) {
        this.calendar.month = 12;
        this.calendar.year--;
      } else {
        this.calendar.month--;
      }
    },
    forwardMonth: function() {
      if (this.calendar.month == 12) {
        this.calendar.month = 1;
        this.calendar.year++;
      } else {
        this.calendar.month++;
      }
    }
  },
  watch: {
    tutorID: function (val) {
      if(val == "findMore") {
        this.$router.push({ path: 'Tutors'});
      }
    },
  }
};
</script>

<style scoped>
.session-container {
  background-color: azure;
  margin: 1%;
}
.more-info {
  visibility: hidden;
}

.calendar-container {
  width: 210px;
}
.calendar-day {
  float: left;
  width: 30px;
  height: 30px;
  background-color: white;
}
.selected {
  background-color: green;
}
</style>
