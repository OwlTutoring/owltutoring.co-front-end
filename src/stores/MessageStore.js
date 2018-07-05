
const MessageStore = {
    data: {
        message: "no message",
        show: false,
        isError: true,
    },
    methods: {
        showMessage: function(message, isError) {
            
            MessageStore.data.message = message;
            MessageStore.data.isError = isError;
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