<template>
  <form onSubmit="console.log('rhfghfg')" class="tutor-search">
    <input class="search-input" placeholder="Subject" v-model="subjectVal" id="subject">
    <input class="search-input" placeholder="zipCode" v-model="zipCodeVal" id="zipCode">
    <input class="search-input" type="number" placeholder="distance" v-model="distanceVal"  min="1" max="5" id="distance"> miles away
     <router-link class= "color-button" :to="'Tutors'+ requestString">Find Tutors</router-link>
  </form>
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
        querys.push("subject=" + this.subjectVal);
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
.tutor-search {
  text-align: center;
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
  display:inline-block;
  border-color: grey;
}
.search-input {
  border: none;
  font-size: 1em;
  padding: 0.3em;
  
}
.search-input:focus {
  outline: none;
}
</style>
