<template>
  <div class = "session-container">
    <div v-if="!!editing">
      <div id="message">New Session</div>
      <input size="2" v-model.lazy="hour" id="hour">:<input size="2" v-model.lazy="minute" id="minute"> <select v-model="AMPM" id="AMPM">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
      </select>
      <div class="dateEntry">
      <input @focus="showCalander=true" @blur="showCalander=false" v-model.lazy="month" id="month" size="2">/<input @focus="showCalander=true" @blur="showCalander=false" v-model.lazy="day" id="day" size="2">/<input @focus="showCalander=true" @blur="showCalander=false" v-model.lazy="year" id="year" size="4">
      <div v-bind:class="{show: showCalander}" class="calendar-container"><h2><button @click="backMonth()"> < </button>{{getMonth}}<button @click="forwardMonth()"> > </button></h2><div v-for="day in days" v-on:click="selectDay(day)" v-bind:class="{'selectedDay':day == dayVal.toString() }" class="calendar-day">{{day}}</div> </div>
      </div>
      <input v-model="length" id="length"size="1">hr(s)

      <div v-if="session.isnew">
      <select v-model="otherID" id="tutor">
      <option v-for="account, i  in relatedAccounts" :value="account.ID.N">{{account.firstName.S}} {{account.lastName.S}}</option>
      <option value="findMore">Find more Tutors</option>
      </select>
      </div>
      <div v-else>
        {{session.name}}
      </div>

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
import MessageStore from "../stores/MessageStore";
export default {
  props: {
    session: {
      type: Object,
      editing: false
    }
  },
  name: "Session",
  data: function() {
    var startDate = new Date(parseInt(this.session.startTime));
    return {
      otherID: null,
      editing: false,
      showCalander: false,
      dayVal: this.session.isnew
        ? new Date().getDate() + 1
        : startDate.getDate(),
      monthVal: this.session.isnew
        ? new Date().getMonth()
        : startDate.getMonth(),
      yearVal: this.session.isnew
        ? new Date().getFullYear()
        : startDate.getFullYear(),
      hourVal: this.session.isnew
        ? 4
        : startDate.getHours() <= 12
          ? startDate.getHours()
          : startDate.getHours() - 12,
      minuteVal: this.session.isnew ? 0 : startDate.getMinutes(),
      AMPM: this.session.isnew
        ? "PM"
        : startDate.getHours() <= 12 ? "AM" : "PM",
      length: 1,
      relatedAccounts: []
    };
  },
  created: function() {
    var _this = this;
    if (this.session.isnew) {
      this.editing = true;
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
          _this.otherID = _this.relatedAccounts[0].ID.N;
        })
        .catch(function(e) {
          console.log(e);
          //this.errors.push(e)
        });
    }
  },
  computed: {
    minute: {
      get: function() {
        return this.minuteVal < 10 ? "0" + this.minuteVal : this.minuteVal;
      },
      set: function(newVal) {
        this.minuteVal = parseInt(newVal);
      }
    },
    hour: {
      get: function() {
        return this.hourVal <= 12 ? this.hourVal : this.hourVal - 12;
      },
      set: function(newVal) {
        this.hourVal = parseInt(newVal);
      }
    },
    day: {
      get: function() {
        return this.dayVal.toString();
      },
      set: function(newVal) {
        this.dayVal = parseInt(newVal);
      }
    },
    month: {
      get: function() {
        return (this.monthVal + 1).toString();
      },
      set: function(newVal) {
        this.monthVal = parseInt(newVal) - 1;
      }
    },
    year: {
      get: function() {
        return this.yearVal.toString();
      },
      set: function(newVal) {
        this.yearVal = parseInt(newVal);
      }
    },
    days: function() {
      var lengths = [
        31,
        (this.year % 4 == 0 && this.year % 100 != 0) ||
        this.year % 400 == 0
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
      console.log(lengths[this.month]);
      return lengths[this.monthVal];
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
      console.log(months[this.monthVal]);
      //document.getElementById("month").value = this.calendar.month + 1;
      return months[this.monthVal];
    },
    dateTimeString: function() {
      var date = new Date(parseInt(this.session.startTime));
      var days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
      var AMPM = "am";
      var hours = date.getHours();
      if (hours > 12) {
        AMPM = "pm";
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
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear()
      );
    }
  },
  methods: {
    getParams: function() {
      console.log(this);
      return {
        token: localStorage.getItem("token"),
        otherID: this.otherID,
        startTime: new Date(
          this.yearVal,
          this.monthVal,
          this.dayVal,
          this.hourVal,
          this.minuteVal
        )
          .getTime()
          .toString(),
        endTime: (
          new Date(
            this.yearVal,
            this.monthVal,
            this.dayVal,
            this.hourVal,
            this.minuteVal
          ).getTime() +
          this.length * 3600000
        ).toString(),
        sessionLocation: "TODO: LOCATION"
      };
    },
    editLesson: function() {
      var _this = this;
      console.log(_this);
      var params = this.getParams();
      params["sessionID"] = this.session.ID;
      console.log(params);
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/editSession",
          params
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message);
          console.log("refresh");
          _this.$emit("refresh");
          _this.editing = false;
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message);
          //this.errors.push(e)
        });
    },
    scheduleLesson: function() {
      var _this = this;
      console.log(_this);
      var params = this.getParams();
      console.log(params);
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/createSession",
          params
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message);
          console.log("refresh");
          _this.$emit("refresh");
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message);
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
      this.dayVal = parseInt(day);
      document.getElementById("day").value = day;
      this.showCalander = false;
    },
    backMonth: function() {
      if (this.monthVal == 0) {
        this.monthVal = 11;
        this.yearVal--;
      } else {
        this.monthVal--;
      }
    },
    forwardMonth: function() {
      if (this.monthVal == 11) {
        this.monthVal = 0;
        this.yearVal++;
      } else {
        this.monthVal++;
      }
    }
  },
  watch: {
    tutorID: function(val) {
      if (val == "findMore") {
        this.$router.push({ path: "Tutors" });
      }
    },
  }
};
</script>

<style scoped>
.session-container {
  border-color: black;
  border-width: 2px;
  border-style: solid;
  border-radius: 20px;
  padding: 1%;
  margin: 1%;
}
.more-info {
  visibility: hidden;
}

.calendar-container {
  width: 210px;
  position: absolute;
  display: none;
  background-color: white;
}
.calendar-day {
  float: left;
  width: 30px;
  height: 30px;
  background-color: white;
}
.selectedDay {
  background-color: green;
}
.show {
    display: block;
}
</style>
