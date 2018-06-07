<template>
  <div class = "session-container">
    <div v-if="session.isnew">
      <div id="message">New Session</div>
      <input v-model="hour" id="hour">:<input v-model.lazy="minute" id="minute"> <select v-model="AMPM" id="AMPM">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
      </select>
      <input v-model="calendar.selected" id="day">/<input v-model="calendar.month" id="month">/<input v-model="calendar.year" id="year">
      <div v-if="showCalander" class="calendar-container"><h2><button @click="backMonth()"> < </button>{{getMonth}}<button @click="forwardMonth()"> > </button></h2><div v-for="day in days" v-on:click="selectDay(day)" v-bind:class="{'selected':day == calendar.selected }" class="calendar-day">{{day}}</div> </div>
      <input id="length">hr(s)
      <select id="tutor">
      <option value="none">{{session.tutorName}}</option>
      <option value="Client">Eunice Yoon</option>
      <option value="Tutor">Sharon Song</option>
    </select>
    </div>
    <div v-else>
    <h2>{{dateTimeString}}</h2>
    {{session.name}}
    <button>Edit</button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    session: {
      type: Object
    },
  },
  name: "Session",
  data: function() {
    return {
      expanded: false,
      showCalander: true,
      calendar: {
        selected: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      hour: 5,
      minuteVal: 0,
      AMPM: "PM",
    };
  },
  computed: {
    minute: {
      get: function() {
        return (this.minuteVal < 10 ? "0" + this.minuteVal : this.minuteVal);
      },
      set: function(newVal) {
        this.minuteVal = newVal;
      }
    },
    days: function() {
      var lengths = [31, (((this.calendar.year%4==0)&&(this.calendar.year%100!=0))||(this.calendar.year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      console.log(lengths[this.calendar.month-1]);
      return lengths[this.calendar.month-1];
    },
    getMonth: function() {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      console.log(months[this.calendar.month-1]);
      //document.getElementById("month").value = this.calendar.month + 1;
      return months[this.calendar.month-1];
    },
    dateTimeString: function() {
      var date = new Date(parseInt(this.session.startTime));
      var days = [
        "Mon",
        "Tue",
        "Wed",
        "Thurs",
        "Fri",
        "Sat",
        "Sun"
      ];
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
    toggleMore: function() {
      console.log(this.expanded);
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    },
    selectDay(day) {
      console.log(day);
      this.calendar.selected = day;
      document.getElementById("day").value = day;
    },
    backMonth() {
      if (this.calendar.month == 1) {
        this.calendar.month = 12;
        this.calendar.year --;
      } else {
        this.calendar.month --;
      }
    },
    forwardMonth() {
      if (this.calendar.month == 12) {
        this.calendar.month = 1;
        this.calendar.year ++;
      } else {
        this.calendar.month ++;
      }
    }
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
