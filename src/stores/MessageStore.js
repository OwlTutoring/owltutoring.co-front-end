
const MessageStore = {
    data: {
        message: "no message"
    },
    methods: {
        showMessage: function(message) {
            console.log(MessageStore.data.message);
            MessageStore.data.message = message;
            console.log(MessageStore.data.message);
        }
    },
};

export default MessageStore;