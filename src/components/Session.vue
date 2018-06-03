<template>
  <div>
    <h2>{{dateTimeString}}</h2>
  </div>
</template>

<script>
export default {
  props: ["session"],
  name: "Session",
  data: function() {
    return {
      expanded: false,
    }
  },
  computed: {
    dateTimeString: function() {
      var date = new Date(parseInt(this.session.startTime))
      var days = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      var AMPM = "AM";
      var hours = date.getHours();
      if(hours > 12) {
        AMPM = "PM";
        hours -= 12;
      }
      // 4:30PM Monday, 4/6/2018
      return hours+":"+ ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes()) + AMPM + " " + days[date.getDay()] + " " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    },
  },
  methods: {
    toggleMore: function() {
      console.log(this.expanded);
      if(this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }
};

</script>

<style scoped>
.more-info {
  visibility: hidden;
}
</style>
