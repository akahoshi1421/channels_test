window.addEventListener('load', chat);
function chat()
{
    var a = document.getElementById("room");
    var roomName = a.textContent;
    var chatSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/chat/' + roomName + '/');
    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        document.querySelector('#chat-log').value += (message + '\n');
    };
    /*chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };*/
    document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };
    document.querySelector('#chat-message-submit').onclick = function(e) {//POST処理
        var messageInputDom = document.querySelector('#chat-message-input');
        var message = messageInputDom.value;
        chatSocket.send(JSON.stringify({'message': message}));//POST
        messageInputDom.value = '';
    };
}