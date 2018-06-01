<template>
  <div>
    <h1>Tutors</h1>
    <ul>
      <li v-for="tutor, i in tutors"><div class="tutor">{{tutor.firstName}} {{tutor.lastName}} <a :href= " '#/Tutor/'+ tutor.ID" >More Info</a></div></li>
    
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {  
  data: function () {
    return {
      tutors:[],
    }
  },
  created: function () {
    var _this = this;
    axios.get('https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutors')
    .then(function(response) {
      // JSON responses are automatically parsed.
      console.log(response);
      _this.tutors = response.data.tutors
    })
    .catch(function(e) {
      console.log(e);
      //this.errors.push(e)
    })
  }

}
</script>

<style>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>
