<template>
<div class="grid-margin-container">
  <div class="signup-grid">
    <h1>Sign Up</h1>
    <h4 id="message"></h4>
    <select class="form-field" v-model="accountType" id="accountType">
      <option value="null">Select Account Type</option>
      <option value="Client">Client</option>
      <option value="Tutor">Tutor</option>
    </select>
    <div id="parent-select" v-if="accountType == 'Client'">
      Are you a parent?
      <input class="hidden-radio" id="no" :value="false" name="isParent" v-model="isParent" type="radio">
      <label class="" for="no">No</label>
      <input class="hidden-radio" id="yes" :value="true" name="isParent" v-model="isParent" type="radio">
      <label class="" for="yes">Yes</label>
    </div>
    <input  placeholder="First name" class="form-field" v-model="firstName" id="firstName">
    <input placeholder="Last name" class="form-field" v-model="lastName" id="lastName">
    <input placeholder="Email" class="form-field wide-input" v-model="email" id="email">
    <input placeholder="Phone (000) 000-0000" class="form-field wide-input" v-model="phone" id="phone">
    <input placeholder="Password" class="form-field wide-input" v-model="password" id="password" type="password">
    <input placeholder="Confirm password" class="form-field wide-input" v-model="confirmPassword" id="confirmPassword" type="password">
    <div class="wide-input" v-if="isParent && accountType == 'Client'">
      <div class="child-grid" v-for="(student, index) in students">
        <input placeholder="Child's Name"class="form-field child" id="student" v-model="students[index]">
        <button class="color-button remove-button" v-on:click="removeStudent(index)">remove</button> 
      </div>
      <button class="plain-button" v-on:click="addStudent()">Add Child</button>
    </div>
    <button class="color-button wide-input" id="signUp" v-on:click="signUp()">SignUp</button>
  </div>
  <div class="after-margin"></div>
</div>
</template>

<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";
export default {
  data: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      accountType: null,
      isParent: false,
      students: [""],
      password: "",
      confirmPassword: "",
      accountType: null,
    };
  },
  created: function() {
    document.title = "Sign Up - Owl Tutoring";
  },
  methods: {
    getStudentInputs: function() {
      var studentInput = [];
      for(var i = 0; i < this.students.length; i++) {
        studentInput.push({S:this.students[i]});
      }
      console.log(studentInput);
      return studentInput;
    },
    removeStudent: function(index) {
      this.students.splice(index, 1);
    },
    addStudent: function() {
      this.students.push("");
    },
    signUp: function() {
      var _this = this;
      if(this.password != _this.confirmPassword) {
        MessageStore.methods.showMessage("Error, Passwords don't match", true);
        return;
      }
      if(_this.accountType == "none") {
        MessageStore.methods.showMessage("please select an account type", true);
        return;
      }
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/signUp",
          {
            accountType: _this.accountType,
            email: _this.email,
            password: _this.password,
            firstName: _this.firstName,
            lastName: _this.lastName,
            phone: _this.phone,
            isParent: _this.isParent,
            students: _this.getStudentInputs(),
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

<style scoped>
.signup-grid {
  grid-column: 2 / 2;
  display: grid;
  grid-gap: 1em;
  grid-auto-columns: auto auto;
  margin-bottom: 20vh;
}
.wide-input {
  grid-column: span 2;
}
#firstName {
  grid-column: 1 / 1;
}
#lastName {
  grid-column: 2 /2;
}
.child-grid {
  display: grid;
  grid-auto-columns: auto auto;
  grid-gap: 1em;
  margin: 1em 0;
}
.child {
  grid-column: 1 / 1;
}
.remove-button {
  grid-column: 2 / 2;
}
.hidden-radio {
  display: none;
  background-color: white;
}
.hidden-radio + label {
  padding: 7px;
  font-size: 1.2em;
  border-style: solid;
  border-color: #cccccc;
  display: block;
  float:right;
}
#yes + label{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
#no + label {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.hidden-radio:checked + label {
  background-color: #3399ff;
  color: white;
}
#parent-select {
  display: block;
}
</style>
