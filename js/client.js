let socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");



const append =(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();//preventdefault delete the whole pragraph
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
const name = prompt("Enter your name to join");
// socket.emit('new-user-joined' , name);
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})


socket.on('leave',name =>{
    append(`${data.name} left the chat`, 'left');
})