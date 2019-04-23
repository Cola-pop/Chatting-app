// $(document).ready(function(){
//
//   var socket = io.connect('http://localhost:3000');
//
//   $(() => {
//     $("#send").click(()=>{
//       sendMessage({
//         name: $("#name").val(),
//         message:$("#message").val()
//       });
//
//     });
//     // getMessages();
//     socket.emit('message added', getMessages());
//   });
//
//   // $("#add_status").click(function(){
//   //            socket.emit('status added',$("#comment").val());
//   //          });
//
//   socket.on('message', addMessages);
//   socket.connect();
//
//   function addMessages(message){
//     $("#messages").append("<h4>" + message.name + "</h4> <p>" + message.message +"</p>");
//   }
//
//   function getMessages(){
//     $.get("http://localhost:3000/messages", (data) => {
//       data.forEach(addMessages);
//     });
//   }
//
//   function sendMessage(message){
//     $.post("http://localhost:3000/messages", message);
//   }
//
// });

var socket = io();
$(() => {
  $("#send").click(()=>{
    sendMessage({name: $("#name").val(), message: $("#message").val()});
  });
  getMessages();
});
socket.on('message', addMessages);
function addMessages(message){
  $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
}
function getMessages(){
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addMessages);
  });
}
function sendMessage(message){
  $.post('http://localhost:3000/messages', message);
}
