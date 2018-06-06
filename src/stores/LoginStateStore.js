
const loginStateStore = {
    data: {
        loggedIn: false,
    },
    methods: {
        logout: function() {
            localStorage.setItem("token", null);
            loginStateStore.data.loggedIn = false;
            console.log("logged OUT!");
        },
        login: function(token) {
            localStorage.setItem("token", token);
            loginStateStore.data.loggedIn = true;
            console.log("logged IN!");
        },
        refresh: function() {
            loginStateStore.data.loggedIn = (localStorage.getItem("token") != null);
        }
    },
};

export default loginStateStore;