
const MessageStore = {
    data: {
        message: "no message",
        show: false,
        color: "red",
    },
    methods: {
        showMessage: function(message, color) {
            
            MessageStore.data.message = message;
            MessageStore.data.color = color;
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