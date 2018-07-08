<template>
  <div class="home">
    <div class="head-img">
      <h2 class="tag-line">Quality, Personal, and Affordable Peer to Peer Tutoring</h2>
      <Tutor-search />
      <h3>need help? text <a href="sms://2248149291">(224) 814-9291</a></h3>
    </div>
    <div class="home-grid">
      <div id="why-image"></div>
      <div id="why">
        <h1>Why Owl Tutoring?</h1>
        Owl Tutoring provides a unique tutoring experience focused on providing trained, qualified, and experienced tutors who can realate too and mentor their students. Owl Tutoring strives to provide these services at a competitive and affordable rate.
      </div>
    </div>
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
.head-img {
  background-image: url("https://images.pexels.com/photos/301943/pexels-photo-301943.jpeg?cs=srgb&dl=apple-book-business-301943.jpg&fm=jpg");
  background-size: 100vw;
  background-position: center; 
  margin: 0;
  padding: 5%;
}
#why-image {
  background-image: url("https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?cs=srgb&dl=adult-blur-business-239548.jpg&fm=jpg");
  width: 30vw;
  height: 30vw;
  background-size: auto 30vw;
  grid-column: 2 / 2;
  grid-row: 1 / 1;
  margin: 5vw 5vw 5vw 0;
}
.home-grid {
  display: grid;
  grid-auto-columns: auto auto;
}
#why {
  margin: 5vw;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
</style>
