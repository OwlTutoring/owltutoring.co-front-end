<template>
  <div class="tutor-grid">
    <img v-on:click="moreInfo()" class="profile-image" :src="tutor.imageLink">
    <div v-on:click="moreInfo()" class="line-one-grid">
      <h1 class="name">{{tutor.firstName}} {{tutor.lastName}}</h1>
      <h3 class="grade">{{tutor.grade}}th Grade</h3>
      <h3 class="rate">${{tutor.rate}}/hr</h3>
    </div>
    <div v-on:click="moreInfo()" class="short-bio">{{tutor.shortBio}}</div>
    <h4 v-on:click="moreInfo()" class="subjects">{{tutor.subjectsDesc}}</h4>
    <h4 v-on:click="moreInfo()" class="levels">{{levelsList}}</h4>
    <h4 v-on:click="moreInfo()" class="town">{{tutor.town + ", " + tutor.usState}}</h4>
    <div class= "more-info-grid" v-if="expanded">
      <h4 class="phone">Phone: <a :href= "'sms:' + tutor.phone">{{formatedPhone}}</a></h4>
      <h4 class="email">Email: <a :href= "'mailto:' + tutor.email">{{tutor.email}}</a></h4>
      <p class="experience"><b>Experience:</b> {{tutor.experience}}</p>
      <p class="bio"><b>Bio:</b> {{tutor.bio}}</p>
    </div>
    <button class ="button-one light-button" v-on:click="toggleMore()"><div v-if="!expanded">more info</div><div v-else>less info</div></button><br>
    <button class="button-two color-button" v-on:click="chosseTutor()">Schedule a Lesson</button>
    <div v-if="showLoginSignup" id="popup-window-back">
      <div id="popup-window">
        <h2>Login or SignUp to continue</h2>
        <router-link class="color-button" :to="'signUp/Sessions' + nextParams">Sign Up</router-link>
        <router-link class="color-button" :to="'login/Sessions' + nextParams">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";
import AccountStore from "../stores/AccountStore";
import LoadingStateStore from "../stores/LoadingStateStore";
export default {
  props: ["tutor"],
  name: "Tutor",
  data: function() {
    return {
      expanded: false,
      AccountStore: AccountStore.data,
      showLoginSignup: false,
    };
  },
  computed: {
    nextParams: function() {
      return "?connectAccountID=" + this.tutor.ID;
    },
    subjectList: function() {
      return creatListString(this.tutor.subjects);
    },
    levelsList: function() {
      return creatListString(this.tutor.levels);
    },
    formatedPhone: function() {
      var phoneString = this.tutor.phone;
      return phoneString.length == "10" ? "(" + phoneString.substring(0,3) + ") " + phoneString.substring(3,6) + "-" + phoneString.substring(6,10) : phoneString.substring(0, 1) + " (" + phoneString.substring(1,4) + ") " + phoneString.substring(4,7) + "-" + phoneString.substring(7,11); 
    }
  },
  methods: {
    chosseTutor: function() {
      var _this = this;

      // if logged in
      if(AccountStore.data.account != null) {

        //conect account and redirect to sessions
        LoadingStateStore.methods.addLoading();
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
            LoadingStateStore.methods.removeLoading();

          })
          .catch(function(e) {
            console.log(e);
            MessageStore.methods.showMessage(e.response.data.message, true);
            LoadingStateStore.methods.removeLoading();
            //this.errors.push(e)
          });
      } else {
        this.showLoginSignup = true;
      }
    },
    moreInfo: function() {
      this.expanded = true;
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
  grid-template-columns: 20vw auto auto auto;
  grid-template-rows: auto auto auto auto auto;
  grid-gap: 1em;

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
  grid-template-columns: repeat(auto, 3);
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
.subjects {
  grid-column: 2 / 5;
  grid-row: 3 / 3;
}
.levels {
  grid-column: 4 / 5;
  grid-row: 3 / 3;
}

.more-info-grid {
  grid-column: 1 / 5;
  grid-row: 4 / 4;
  display: grid;
  grid-template-columns: auto auto;
}
.phone {
  grid-column: 1 / 1;
}
.email {
  grid-column: 2 / 2;
}
.experience {
  grid-column: 1 / 3;
}
.bio {
  grid-column: 1 / 3;
}

.town {
  grid-column: 1 / 3;
  grid-row: 5 / 5;
  margin: .1em;
}
.button-one {
  grid-column: 3 / 4;
  grid-row: 5 / 5;
}
.button-two {
  grid-column: 4 / 5;
  grid-row: 5 / 5;
}
#popup-window {
  font-size: 1em;
  text-align: center;
  border-style: solid;
  display: block;
  margin: auto;
  width:fit-content;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border-color: #cccccc;
  top: 50%;
  transform: translateY(-50%);
}
#popup-window-back {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #EEEEEE;
  top: 0;
  left: 0;
  padding-top: 50vh;
}
</style>
