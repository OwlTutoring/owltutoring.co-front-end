<template>
  <div class="tutors">
    <div class="top-info">
      <h1>Tutors</h1>
    </div>
    <div v-for="tutor, i in tutors"><TutorApplication class="tutor" :tutor="tutor" /></div>

  </div>
</template>

<script>
import TutorApplication from './TutorApplication.vue';
import axios from "axios";
import LoadingStateStore from "../stores/LoadingStateStore";

export default {
  components: {
    TutorApplication,
  },
  data: function() {
    return {
      tutors: []
    };
  },
  methods: {
    getTutors: function() {
      LoadingStateStore.methods.addLoading();
      var _this = this;
      console.log("https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutorApplications");
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutorApplications",
          { token: localStorage.getItem("token") }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          _this.tutors = response.data.tutors;
          setTimeout(function() {
          LoadingStateStore.methods.removeLoading();
          }, 1000);
        })
        .catch(function(e) {
          console.log(e);
          LoadingStateStore.methods.removeLoading();
          //this.errors.push(e)
        });
    }
  },
  created: function() {
    this.getTutors();
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
.tutor {
  margin: 5%;
}
.top-info {
  text-align: center;
}
</style>
