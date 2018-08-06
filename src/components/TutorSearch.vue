<template>
  <form onSubmit="console.log('rhfghfg')" class="tutor-search">
    <input class="search-input" placeholder="Subject" v-model="subjectVal" id="subject">
    <input class="search-input" placeholder="Zip Code" v-model="zipCodeVal" id="zipCode">
    <input class="search-input" type="number" placeholder="distance" v-model="distanceVal"  min="1" max="5" id="distance"><div class="miles-desc">miles away</div>
    <router-link class= "color-button" id="search-button" :to="'Tutors'+ requestString">Find Tutors</router-link>
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
        querys.push("subject=" + this.subjectVal.toLowerCase());
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
  background-color: white;
}
.search-input {
  border: none;
  font-size: 1em;
  padding: 0.3em;
  
}
.search-input:focus {
  outline: none;
}
.miles-desc {
  text-align: left;
  display: inline;
}
@media only screen and (max-device-width: 480px) {
  .tutor-search {
    display: grid;
  }
  .search-input {
    grid-column: 1 / span 2;
    font-size: 1.7em;
  }
  #distance {
    grid-column: 1 / span 1;
  }
  .miles-desc {
    grid-column: 2 / span 1;
    font-size: 1.7em;
  }
  #search-button {
    grid-column: 1 / span 2;
    font-size: 1.7em;
  }
}
</style>
