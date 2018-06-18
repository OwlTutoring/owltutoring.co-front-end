<template>
  <div>
    <h1>Sign Up</h1>
    <h4 id="message"></h4>
    <select v-model="accountType" id="accountType">
      <option value="null">Select Account Type</option>
      <option value="Client">Client</option>
      <option value="Tutor">Tutor</option>
    </select>
    <div v-if="accountType == 'Client'">
      Are you a parent? <input class="form-field" v-model="isParent" type="checkbox">
    </div>
    <input  placeholder="First Name" class="form-field" v-model="firstName" id="firstName">
    <input placeholder="Last Name" class="form-field" v-model="lastName" id="lastName">
    Email: <input class="form-field" v-model="email" id="email">
    Phone Number: <input placeholder="(000) 000-0000" class="form-field" v-model="phone" id="phone">
    Password: <input class="form-field" v-model="password" id="password" type="password">
    Confirm password: <input class="form-field" v-model="confirmPassword" id="confirmPassword" type="password">
    <div v-if="isParent && accountType == 'Client'">
      Children Names:
      <div v-for="(student, index) in students"><input class="form-field" id="student" v-model="students[index]"><button v-on:click="removeStudent(index)">-</button> </div>
      <button class="plain-button" v-on:click="addStudent()">Add Child</button>
    </div>
    <button class="color-button" v-on:click="signUp()">SignUp</button>
    <router-link to="login">Login</router-link>
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
        MessageStore.methods.showMessage("Error, Passwords don't match");
        return;
      }
      if(_this.accountType == "none") {
        MessageStore.methods.showMessage("please select an account type");
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
          MessageStore.methods.showMessage(response.data.message);
        })
        .catch(function(e) {
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message);
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
</style>
