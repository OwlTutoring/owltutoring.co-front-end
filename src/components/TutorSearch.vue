<template>
  <div>
    <input  placeholder="Subject" v-model="subject" id="subject">
    <input  placeholder="zipCode" v-model="zipCode" id="zipCode">
    <input  placeholder="distance" v-model="distance" id="distance"> miles away
     <router-link class= "color-button" :to="'Tutors'+">Tutors</router-link>
  </div>
</template>

<script>
import axios from "axios";
import SubjectTypesStore from "../stores/SubjectTypesStore";
export default {
  name: 'Tutor-search',
  data: function() {
    return {
      subject: "",
      zipCode: "",
      distance: 5,
    };
  },
  created: function() {
    
  }
};
</script>

<style>

</style>
