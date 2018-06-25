<template>
  <div class="tutor-grid">
    <img class="profile-image" :src="tutor.imageLink">
    <div class="line-one-grid">
      <h1 class="name">{{tutor.firstName}} {{tutor.lastName}}</h1>
      <h3 class="grade">{{tutor.grade}}th Grade</h3>
      <h3 class="rate">${{tutor.rate}}</h3>
    </div>
    <div class="short-bio">{{tutor.shortBio}}</div>
    <h4 class="subjects">{{subjectList}}</h4>
    <h4 class="levels">{{levelsList}}</h4>
    <h4 class="town">{{tutor.town + ", " + tutor.usState}}</h4>
    <div v-if="expanded">
      <h4>Phone: <a :href= "'sms:' + tutor.phone"> {{tutor.phone}}</a></h4>
      <h4>Email:<a :href= "'mailto:' + tutor.email"> {{tutor.email}}</a></h4>
      <p><b>Experience:</b> {{tutor.experience}}</p>
      <p><b>Bio:</b> {{tutor.bio}}</p>
    </div>
    <button class ="button-one light-button" v-on:click="toggleMore()"><div v-if="!expanded">more info</div><div v-else>less info</div></button><br>
    <button class="button-two color-button" v-on:click="chosseTutor()">Schedule a Lesson</button>
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
  /*
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
  */
  return list;
}
</script>

<style scoped>
.tutor-grid {
  display: grid;
  grid-template-columns: 20vw 1fr 1fr 1fr;
  grid-template-rows: repeat(1fr, 4);

}
.more-info {
  visibility: hidden;
}
.profile-image {
  width: 20vw;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}
.line-one-grid {
  grid-column: 2 / 5;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(1fr 3);
}
.name {
  grid-column: 1 / 2;
  grid-row: 1 / 1;
}
.grade {
  grid-column: 2 / 3;
  grid-row: 1 / 1;
}
.rate {
  grid-column: 3 / 4;
  grid-row: 1 / 1;
  text-align: right;
}
.short-bio {
  grid-column: 2 / 5;
  grid-row: 2 / 2;
}
.subject {
  grid-column: 2 / 4;
  grid-row: 3 / 3;
}
.levels {
  grid-column: 4 / 5;
  grid-row: 3 / 3;
}
.town {
  grid-column: 1 / 3;
  grid-row: 4 / 4;
}
.button-one {
  grid-column: 3 / 4;
  grid-row: 4 / 4;
}
.button-two {
  grid-column: 4 / 5;
  grid-row: 4 / 4;
}
</style>
