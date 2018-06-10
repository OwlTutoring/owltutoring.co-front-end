<template>
  <div>
    <h1>{{tutor.firstName}} {{tutor.lastName}}</h1>
    <h3>${{tutor.rate}}</h3>
    <h3>{{tutor.grade}}th Grade</h3>
    <h4>Subjects: {{subjectList}}</h4>
    <h4>Levels: {{levelsList}}</h4>
    <h4>Town: {{tutor.town}}</h4>
    <button v-on:click="chosseTutor()">Schedule a Lesson</button>
    <button v-on:click="toggleMore()">more info</button>
    <div v-if="expanded">
      <h4>Phone: <a :href= "'sms:' + tutor.phone"> {{tutor.phone}}</a></h4>
      <h4>Email:<a :href= "'mailto:' + tutor.email"> {{tutor.email}}</a></h4>
      <p><b>Experience:</b> {{tutor.experience}}</p>
      <p><b>Bio:</b> {{tutor.bio}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["tutor"],
  name: "Tutor",
  data: function() {
    return {
      expanded: false
    };
  },
  computed: {
    subjectList: function() {
      return creatListString(this.tutor.subjects);
    },
    levelsList: function() {
      return creatListString(this.tutor.levels);
    }
  },
  methods: {
    chosseTutor: function() {
      var _this = this;
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/connectAccounts",
          {
            token: localStorage.getItem("token"),
            otherID: this.tutor.ID,
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          _this.$router.push({ path: 'Sessions', query: { addNew: true }});

        })
        .catch(function(e) {
          console.log(e);
          //this.errors.push(e)
        });
    },
    toggleMore: function() {
      console.log(this.expanded);
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }
};

function creatListString(list) {
  var listString = "";

  for (var i = 0; i < list.length; i++) {
    if (i == list.length - 1 && list.length > 1) {
      listString += "and ";
    }
    listString += list[i].S;
    if (i < list.length - 1) {
      if (list.length > 2) {
        listString += ", ";
      } else {
        listString += " ";
      }
    }
  }
  return listString;
}
</script>

<style scoped>
.more-info {
  visibility: hidden;
}
</style>
