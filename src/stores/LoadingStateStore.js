const LoadingStateStore = {
    data: {
        loading: 1,
    },
    methods: {
        addLoading: function() {
            console.log("loading: " + LoadingStateStore.data.loading);
            console.log("add loading");
            LoadingStateStore.data.loading += 1;
        },
        removeLoading: function() {
            console.log("remove loading");
            LoadingStateStore.data.loading -= 1;
            console.log("loading: " + LoadingStateStore.data.loading);
        }
    },
};

export default LoadingStateStore;