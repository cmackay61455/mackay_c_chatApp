import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function setUserId({sID, message}) {
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    date: {
        socketID: "",
        nackmane: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage() {
            // send chat message
            socket.emit('chat message', { content: this.message, name:
                 this.nickname || "Anonymous"} );

            this.message = "";
        }
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);