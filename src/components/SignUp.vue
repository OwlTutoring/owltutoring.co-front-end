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
      Are you a parent? <input v-model="isParent" type="checkbox">
    </div>
    first name: <input id="firstName">
    last name: <input id="lastName">
    Email: <input id="email">
    Phone Number: <input id="phone">
    Password: <input id="password" type="password">
    Confirm password: <input id="confirmPassword" type="password">
    <div v-if="isParent && accountType == 'Client'">
      Children Names:
      <div v-for="(student, index) in students"><input id="student" v-model="students[index]"><button v-on:click="removeStudent(index)">-</button> </div>
      <button v-on:click="addStudent()">Add Student</button>
    </div>
    <button v-on:click="signUp()">SignUp</button>
    <router-link to="login">Login</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      accountType: null,
      isParent: false,
      students: [""],
    };
  },
  methods: {
    getStudentInputs() {
      var studentInput = [];
      for(student in students) {
        studentInput.push({S:student});
      }
      console.log(studentInput);
      return studentInput;
    },
    removeStudent(index) {
      this.students.splice(index, 1);
    },
    addStudent() {
      this.students.push("");
    },
    signUp: function() {
      if(document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById("message").innerHTML = "Error, Passwords don't match";
        return;
      }
      if(document.getElementById("accountType").value == "none") {
        document.getElementById("message").innerHTML = "please select an account type";
        return;
      }
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/signUp",
          {
            accountType: document.getElementById("accountType").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            phone: document.getElementById("phone").value,
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          document.getElementById("message").innerHTML = response.data.message;
        })
        .catch(function(e) {
          console.log(e);
          document.getElementById("message").innerHTML = e.response.data.message;
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
