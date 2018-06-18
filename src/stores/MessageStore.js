
const MessageStore = {
    data: {
        message: "no message",
        show: false,
    },
    methods: {
        showMessage: function(message) {
            console.log(MessageStore.data.message);
            MessageStore.data.message = message;
            console.log(MessageStore.data.message);
            MessageStore.data.show = true;
            setTimeout( function() {
                console.log("timeout end");
                MessageStore.data.show = false;
            }, 3000);
        }
    },
};

export default MessageStore;