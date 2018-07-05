<template>
  <div>
    <h1>Tutor Profile</h1>
    Bio: <input placeholder="A paragraph description of information related to your Academic knowledge and teaching abilities" type="text" class="form-field" v-model="bio" id="bio">
    
    <subject-select :subjectObj="subjectOptions" :selectedSubjects="selectedSubjects" parent="*"/>
    Subject List: <input  type="text" placeholder="" class="form-field" v-model="subjectsDesc" id="subjectsDesc">,
    Grade: <input  type="number" placeholder="11" class="form-field" v-model="grade" id="grade">
    Town: <input  type="text" placeholder="Vernon Hills" class="form-field" v-model="town" id="town">
    State: 
    <select v-model="usState">
      <option v-for="state in states" :value="state">{{state}}</option>
    </select>
    Zip Code: <input  type="number" placeholder="60061" class="form-field" v-model="zipCode" id="zipCode">,
    Experience: <input  type="text" placeholder="Describe what experience you have" class="form-field" v-model="experience" id="experience">,
    Short Bio: <input  type="text" placeholder="One Sentenece describing yourself" class="form-field" v-model="shortBio" id="shortBio">,
    <button class="color-button" v-on:click="update()">Submit Profile</button>
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
</style>
