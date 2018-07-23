import axios from "axios";
import LoadingStateStore from "./LoadingStateStore";
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
      if(!localStorage.getItem("token")) {
        accountStore.data.account = null;
        return;
      }
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/getAccountInfo",
          { token: localStorage.getItem("token") }
        )
        .then(function (response) {
          LoadingStateStore.methods.removeLoading();
          // JSON responses are automatically parsed.
          console.log(response);
          accountStore.data.account = response.data;
        })
        .catch(function (e) {
          LoadingStateStore.methods.removeLoading();
          console.log(e);
          //this.errors.push(e)
        });
    }
  },
};

export default accountStore;