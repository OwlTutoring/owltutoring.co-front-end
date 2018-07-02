<template>
  <div>
    <h1>Tutors</h1>
    <Tutor-search :zipCode="this.$route.query.zipCode" :distance="this.$route.query.distance" :subject="this.$route.query.subject"/>
    <div v-for="tutor, i in tutors"><Tutor class="tutor" :tutor="tutor" /></div>

  </div>
</template>

<script>
import Tutor from './Tutor.vue';
import TutorSearch from './TutorSearch.vue'
import axios from "axios";
export default {
  components: {
    Tutor,
    TutorSearch
  },
  data: function() {
    return {
      tutors: [],
      zipCode: null,
      tutorID: null,
      distance: 0,
    };
  },
  methods: {
    getTutors: function() {
      
      this.zipCode = this.$route.query.zipCode;
      
      this.tutorID = this.$route.query.tutorID;
      this.distance = this.$route.query.distance;
      this.subject = this.$route.query.subject;
      
      console.log(this.zipCode);
      document.title = "Tutors - Owl Tutoring";
      var _this = this;
      var querys = [];
      if(this.tutorID != null) {
        querys.push("tutorID="+ this.tutorID);
      }
      if(this.zipCode != null) {
        querys.push("zipCode="+this.zipCode);
      }
      if(this.distance != null) {
        querys.push("distance=" + this.distance);
      }
      if(this.subject != null) {
        querys.push("sujbect=" + this.subject);
      }
      var queryString = "";
      for(var i = 0; i < querys.length; i ++) {
        if(i == 0) {
          queryString += "?";
        } else {
          queryString += "&";
        }
        queryString += querys[i]
      }
      console.log("https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutors" + queryString);
      axios
        .get(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutors" + queryString
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
  },
  watch: {
    '$route.query'() {
      this.getTutors();
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
</style>
