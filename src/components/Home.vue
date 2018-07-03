<template>
  <div class="home">
    <h1 class="title">Owl Tutoring</h1>
    <h2 class="tag-line">Quality, Personal and Affordable Peer to Peer Tutoring</h2>
    <Tutor-search />
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

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
