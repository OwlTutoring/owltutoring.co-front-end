<template>
  <div>
    <h1>Tutors</h1>
    <div v-for="tutor, i in tutors"><Tutor class="tutor" :tutor="tutor" /></div>

  </div>
</template>

<script>
import Tutor from './Tutor.vue';
import axios from "axios";
export default {
  components: {
    Tutor
  },
  data: function() {
    return {
      tutors: [],
      zipCode: this.$route.query.zipCode,
      tutorID: this.$route.query.tutorID
    };
  },
  created: function() {
    console.log(this.zipCode);
    document.title = "Tutors - Owl Tutoring";
    var _this = this;
    console.log((this.tutorID ? "?tutorID=" + this.tutorID : ""));
    axios
      .get(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutors" + (this.tutorID ? "?tutorID=" + this.tutorID : "")
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response);
        _this.tutors = response.data.tutors;
      })
      .catch(function(e) {
        console.log(e);
        //this.errors.push(e)
      });
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
</style>
