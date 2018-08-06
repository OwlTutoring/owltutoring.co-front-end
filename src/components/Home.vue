<template>
  <div class="home">
    <div class="head-img">
      <h2 class="tag-line">Quality, Personal, and Affordable Peer to Peer Tutoring</h2>
      <Tutor-search />
      <h3>need help? text <a href="sms://2248149291">(224) 814-9291</a></h3>
    </div>
    
    <div id="why-container">
      <div id="why">
        <h1>Why Owl Tutoring?</h1>
        Owl Tutoring provides a unique tutoring experience focused on providing trained, qualified, and experienced tutors who can realate too and mentor their students. Owl Tutoring strives to provide these services at a competitive and affordable rate.
      </div>
      <div id="why-image"></div>
    </div>
    <h1>Qualified and Trained Tutors</h1>
    Our tutors are well rounded and highly inteligent individuals. Many of our Highschool student tutors end up attending prestigious universities after graduation.
    <div class="college-container">
      <img class="college-one college-image" src="https://github.com/Owltutoring/WebsiteImages/blob/master/stanford.png?raw=true">
      <img class="college-two college-image" src="https://github.com/Owltutoring/WebsiteImages/blob/master/harvard.jpg?raw=true">
      <img class="college-three college-image" src="https://github.com/Owltutoring/WebsiteImages/blob/master/northwestern.gif?raw=true">
      <img class="college-four college-image" src="https://github.com/Owltutoring/WebsiteImages/blob/master/cornell.png?raw=true">
    </div>
    <h1>Personal and Relatable</h1>
    <div class="centered-margin-text"> Owl Tutoring provides student tutors who previously took the same classes as their students, allowing them to better understand how their students can effectively learn.</div>
    <br>
    <br>
    <h1>Find a Tutor Today</h1>
    <div class="centered-margin-text">Find a tutor today on our site or text <a href="sms://2248149291">(224) 814-9291</a> for further assistance</div>
    <br><router-link class="color-button" to="Tutors">Find a Tutor</router-link>
    <br>
    <br>
    <h1>Become a Tutor</h1>
    <div class="centered-margin-text">SignUp and submit your profile for review by our team to become an Owl Tutor <router-link class="" to="signup/tutorProfile">Become a Tutor</router-link></div>
    <br>
    <br>
    <br>
    <br>
    <br>
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
#why-container {
  overflow: hidden;
  display: flex;
}
#why-image {
  background-image: url("https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?cs=srgb&dl=adult-blur-business-239548.jpg&fm=jpg");
  width: 60vw;
  height: auto;
  background-size: auto 30vw;
  background-position-y: 50%;
  margin: 5vw 5vw 5vw 0;
}
.home-grid {
  display: grid;
  grid-auto-columns: auto auto;
}
#why {
  margin: 5vw;
}

.college-container {
  display: grid;
  grid-auto-columns: 1fr 1fr 1fr 1fr;
}
.college-one {
  grid-column: 1 / 1; 
}
.college-two {
  grid-column: 2 / 2; 
}
.college-three {
  grid-column: 3 / 3; 
}
.college-four {
  grid-column: 4 / 4; 
}
.college-image {
  width: 20vw;
  justify-self: center;
  align-self: center;
}
.centered-margin-text {
  margin: 0 20%;
  font-size: 1.2em;
}
</style>
