<template>
<div class="grid-margin-container">
  <div id="tutor-profile">
    <h1>Tutor Profile</h1>

    Thank you for your intrest in being an Owl Tutor. After you submit this profile someone at Owl Tutoring will review your qualifications and assuming you are qualified you will be contacted and your profile will be visible on our website. We will then work to connect you with students you are qualified to teach. In a tutor we are looking for high school and college students who are knowledgeable and able to teach a variety of topics at Elementary, Middle school or High School levels. This means you can teach whatever you want and are qualified to teach from algebra or world history to violin or photography. Tutoring sessions typical occur in public places like a library. Tutors can work as many hours that are available to them but can also can have fewer students if they are busy. If you have any questions please text <a href="sms://2248149291">(224) 814-9291</a>
    <h3 class="input-title">How did you find out about Owl Tutoring?</h3>
    <input  type="text" placeholder="Jim Bob told me I would make a great Owl Tutor" class="line-input form-field" v-model="howSource" id="howSource">
    
    <h3 class="input-title">Refferal Code</h3>
    <p class="input-description">
      If you heard about owl tutoring from someone else and they gave you a code provide it here
    </p>
    <input placeholder="code" type="text" class="form-field" v-model="refferalCode" id="refferalCode"> 

    <h3 class="input-title">Biography</h3>
    <p class="input-description">
      please write a paragraph about who you are and what you know. If you are a high school student you can list what relevant classes you have taken and what qualifications you have related to them. Essentially, you should explain why you are qualified to teach what you would like to teach. This will be part of your profile on our website.
    </p>
    <textarea placeholder="A paragraph description of information related to your Academic knowledge and teaching abilities" class="form-field paragraph-input" v-model="bio" id="bio"></textarea>
    
    <h3 class="input-title">Subjects</h3>
    <p class="input-description">
      Select all applicable subjects and their sub categories. this information will be used to provide students with accurate and detailed search results. It will also be displayed as a comprehensive list of what you are qualified to teach.
    </p>
    <subject-select :subjectObj="subjectOptions" :selectedSubjects="selectedSubjects" parent="*"/>
    
    <h3 class="input-title">Subject Description</h3>
    <p class="input-description">
      This is a short list that you beleive best describes what you are most qualified to teach. It will be one of the first things students see when searching for a tutor. It should be a comma seperated list starting with what you think you would like to focus your tutoring on.
    </p>
    <input  type="text" placeholder="" class="form-field line-input" v-model="subjectsDesc" id="subjectsDesc">
    
    <h3 class="input-title">Grade</h3>
    <p class="input-description">
      Enter a number. If you are a college student enter a number coresponding to what year in school you are. for example, a freshman in college would enter 13
    </p>
    <input  type="number" placeholder="11" class="form-field" v-model="grade" id="grade">
    
    <h3 class="input-title">School</h3>
    <p class="input-description">
      Where do you go to school?
    </p>
    <input  type="text" placeholder="Vernon Hills High School" class="form-field" v-model="school" id="school">
  
    <h3 class="input-title">Town</h3>
    <p class="input-description">
      The town you will be tutoring in
    </p>
    <input  type="text" placeholder="Vernon Hills" class="form-field" v-model="town" id="town">
    
    <h3 class="input-title">State</h3>
    <select v-model="usState">
      <option v-for="state in states" :value="state">{{state}}</option>
    </select>

    <h3 class="input-title">Zip Code</h3>
    <input  type="number" placeholder="60061" class="form-field" v-model="zipCode" id="zipCode">
    
    <h3 class="input-title">Experience</h3>
    <p class="input-description">
      Write a short description of your what experience you have. (Ex. John has helped friends and family study for test and do homework all of his life. He has been a private tutor for 2 years.) This will also be part of your public profile 
    </p>
    <textarea placeholder="Describe what experience you have" class="form-field paragraph-input" v-model="experience" id="experience"></textarea>
    
    
    <h3 class="input-title">Short Bio</h3>
    <p class="input-description">
      Write a one line description of yourself. This is what clients will first see along with where you're located and what you teach when looking for a tutor    
    </p>
    <input  type="text" placeholder="One Sentenece describing yourself" class="line-input form-field" v-model="shortBio" id="shortBio">
    
    <h3 class="input-title">Other Info</h3>
    <p class="input-description">
      please write any other information you would like us to know here. This information will not be part of your public profile.
    </p>
    <textarea type="text" placeholder="any other information" class="paragraph-input form-field" v-model="otherInfo" id="otherInfo"></textarea>
    
    <h3 class="input-title">Resume</h3>
    <p class="input-description">
      If you have a resume or would like to provide us information about your qualifications and past work experience please email this information from the email you used to create your account to <a href="mailto:general@owltutoring.co">general@owltutoring.co</a>.
    </p>

    <h3 class="input-title">Profile Photo</h3>
    <p class="input-description">
      Please also email a photo to be used for your public profile to <a href="mailto:general@owltutoring.co">general@owltutoring.co</a>    
    </p>

    <button class="color-button" v-on:click="update()">Submit Profile</button>
  </div>
  <div class="after-margin"></div>
</div>
</template>

<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";
import Vue from "vue";
import SubjectTypesStore from "../stores/SubjectTypesStore";

Vue.component("subject-select", {
  props: ["subjectObj", "selectedSubjects", "parent"],
  template: "<div><div v-for=\"subject in subjectObj.subList\"><input type=\"checkbox\" :id=\"subject.subject\" :value=\"subject.subject\" v-model=\"selectedSubjects[parent +':'+ subject.subject]\"><label :for=\"subject.subject\">{{subject.subject}}</label><div class=\"sub-list\" v-if=\"subject.subList != null && selectedSubjects[parent +':'+ subject.subject]\"><subject-select :subjectObj=\"subject\" :selectedSubjects=\"selectedSubjects\" :parent=\"parent +':'+ subject.subject\"/></div></div></div>"
});

export default {
  data: function() {
    return {
      states: ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'],
      bio: "",
      grade: "",
      town: "",
      usState: "",
      zipCode: "",
      experience: "",
      shortBio: "",
      subjectsDesc:"",
      otherInfo:"",
      school: "",
      selectedSubjects: {},
      subjectOptions: SubjectTypesStore.data.subjects,
    };
  },
  created: function() {
    var _this = this;
    axios
      .post(
        "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getTutorProfile",
        {
          token: localStorage.getItem("token")
        }
      )
      .then(function(response) {
        // JSON responses are automatically parsed.
        console.log(response);
        MessageStore.methods.showMessage(response.data.message, false);
        _this.bio = response.data.bio;
        _this.grade = response.data.grade;
        _this.town = response.data.town;
        _this.usState = response.data.usState;
        _this.zipCode = response.data.zipCode;
        _this.experience = response.data.experience;
        _this.shortBio = response.data.shortBio;
        _this.subjectsDesc = response.data.subjectsDesc;
        _this.selectedSubjects = _this.parseSubjectDataString(response.data.subjects);
      })
      .catch(function(e) {
        console.log(e);
        MessageStore.methods.showMessage(e.response.data.message, true);
        //this.errors.push(e)
      });
  },
  methods: {
    parseSubjectDataString: function(string) {
      var newSubjects ={};
      if (string == null) {
        console.log("no subjects");
        return {};
      }
      var array = string.split(",");
      for (var entry in array) {
        if (array[entry] != "") {
          newSubjects[array[entry]] = true;
        }
      }
      console.log(newSubjects);
      return newSubjects;
    },
    getSubjectDataString: function() {
      console.log(this.selectedSubjects);
      for (var subject in this.selectedSubjects) {
        if (
          this.selectedSubjects.hasOwnProperty(subject) &&
          this.selectedSubjects[subject] == false
        ) {
          for (var subjectTwo in this.selectedSubjects) {
            if (
              this.selectedSubjects.hasOwnProperty(subjectTwo) &&
              subjectTwo.includes(subject)
            ) {
              console.log(subjectTwo);
              this.selectedSubjects[subjectTwo] = false;
            }
          }
        }
      }

      var res = "";
      for (var subject in this.selectedSubjects) {
        if (
          this.selectedSubjects.hasOwnProperty(subject) &&
          this.selectedSubjects[subject]
        ) {
          res += subject + ",";
        }
      }
      console.log(res);
      return res;
    },
    update: function() {
      var _this = this;
      console.log(this.selectedSubjects);
      this.getSubjectDataString();

      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/updateTutorProfile",
          {
            bio: _this.bio,
            grade: _this.grade,
            town: _this.town,
            zipCode: _this.zipCode,
            usState: _this.usState,
            experience: _this.experience,
            shortBio: _this.shortBio,
            subjectsDesc: _this.subjectsDesc,
            subjects: _this.getSubjectDataString(),
            token: localStorage.getItem("token")
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message, false);
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
          //this.errors.push(e)
        });
    }
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
.sub-list {
  padding-left: 3vw;
}
#tutor-profile {
  grid-column-start: 2;
  grid-column-end: 3;
  padding: 3vw;
}
.paragraph-input {
  width: 100%;
  height: 10em;
}
.line-input {
  width: 100%;
}
</style>
