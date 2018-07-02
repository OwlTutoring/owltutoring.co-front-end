<template>
  <div>
    <input  placeholder="Subject" v-model="subjectVal" id="subject">
    <input  placeholder="zipCode" v-model="zipCodeVal" id="zipCode">
    <input size="2" type="number" placeholder="distance" v-model="distanceVal" id="distance"> miles away
     <router-link class= "color-button" :to="'Tutors'+ requestString">Tutors</router-link>
  </div>
</template>

<script>
import axios from "axios";
import SubjectTypesStore from "../stores/SubjectTypesStore";
export default {
  name: 'Tutor-search',
  props: {
    subject: {
      default: ""
    },
    zipCode: {
      default: ""
    },
    distance: {
      default: 5
    }
  },
  data: function() {
    return {
      subjectVal: this.subject,
      zipCodeVal: this.zipCode,
      distanceVal: this.distance,
    };
  },
  created: function() {
    console.log(this.$route.query.tutorID);
  },
  computed: {
    requestString: function() {
      var querys = [];
      if(this.zipCodeVal != null && this.zipCodeVal != "") {
        querys.push("zipCode="+this.zipCodeVal);
      }
      if(this.distanceVal != null && this.distanceVal != "") {
        querys.push("distance=" + this.distanceVal);
      }
      if(this.subjectVal != null && this.subjectVal != "") {
        querys.push("sujbect=" + this.subjectVal);
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
      return queryString;
      
    }
  }
};
</script>

<style>

</style>
