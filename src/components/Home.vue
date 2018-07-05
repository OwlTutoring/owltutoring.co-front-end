<template>
  <div class="home">
    <h2 class="tag-line">Quality, Personal, and Affordable Peer to Peer Tutoring</h2>
    <Tutor-search />
    <h3>need help? text <a href="sms://2248149291">(224) 814-9291</a></h3>
    <h1>Why Owl Tutoring?</h1>
    Owl Tutoring provides a unique tutoring experience focused on providing trained, qualified, and experienced tutors who can realate too and mentor their students. Owl Tutoring strives to provide these services at a competitive and affordable rate.
  </div>
</template>

<script>
import TutorSearch from './TutorSearch.vue';
export default {
   components: {
    TutorSearch
  },
  name: 'Home',
  data: function data() {
    return {
    }
  },
  created: function() {
    document.title = "Owl Tutoring";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.title {
  text-align: center;
}
.tag-line {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
.home {
  text-align: center;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {

}

</style>
