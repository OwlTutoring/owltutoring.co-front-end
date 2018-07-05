import axios from "axios";

const accountStore = {
  data: {
    loggedIn: false,
    account: null,
  },
  methods: {
    logout: function () {
      localStorage.setItem("token", null);
      accountStore.data.account = null;
      console.log("logged OUT!");
    },
    login: function (token) {
      localStorage.setItem("token", token);
      accountStore.methods.refreshAccount();
      console.log("logged IN!");
    },
    refreshAccount: function () {
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getAccountInfo",
          { token: localStorage.getItem("token") }
        )
        .then(function (response) {
          // JSON responses are automatically parsed.
          console.log(response);
          accountStore.data.account = response.data;
        })
        .catch(function (e) {
          console.log(e);
          //this.errors.push(e)
        });
    }
  },
};

export default accountStore;