<template>
  <div class = "session-container">
    <h2>{{dateTimeString}}</h2>
    <div v-if="session.isnew">
      new
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
      expanded: false
    };
  },
  computed: {
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
    }
  }
};
</script>

<style scoped>
.session-container {
  background-color: azure;
}
.more-info {
  visibility: hidden;
}
</style>
