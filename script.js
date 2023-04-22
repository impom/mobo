var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  let views = localStorage.views;
  let Cviews = views+1;
  localStorage.setItem("views",Cviews);
  views.innerHTML = "Total Page Views :"+Cviews;
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom : " + room;
  })

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length < 19){
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#303030";
    }
  })
}
function Connect(){
  if(usernameInput.value == "" || chatIDInput.value ==""){
    window.alert("Please enter a valid username and room id to join !!")
  }
    else if( usernameInput.value.length <= 3 || chatIDInput.value ==""){
    alert("Username length should be more that 3 letters");
    }
  else {socket.emit("join", chatIDInput.value, usernameInput.value);
       chatIDInput.disabled = true;
       usernameInput.disabled = true;
       usernameInput.style.cursor = "not-allowed";
       chatIDInput.style.cursor = "not-allowed";
      usernameInput.style.filter = "brightness(70%)";
      chatIDInput.style.filter = "brightness(70%)";
      SendMessage.disabled = false;
      exit.disabled = false;
      SendMessage.style.cursor = "pointer";
}
  
}

function Send(){
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}
function wc(){
  chatIDInput.disabled = true;
  chatIDInput.type ="text";
  chatIDInput.value = "World Chat 🌐";
  addEventListener(onclick,Connect());
}
function exit(){
  location.reload();
}
function bg() {
  if (localStorage.setBg == "true"){
    localStorage.setItem("setBg","false");
  file.style.cursor="default";
  file.style.height="0%";
  file.style.width="0%";
  file.style.opacity="0%";
  file.style.margin="20px";
  file.style.padding="20px";
  }
  else {file.disabled = false;
  file.style.height = "15%";
  file.style.opacity ="100%";
  file.style.width = "30%";
  localStorage.setItem("setBg","true");
       }
}
function wp() {
  location.href = "https://wa.me/+919593035680";
}

var mySession = window.sessionStorage, pageCount;
// mySession.setItem("pageCount",0);
window.addEventListener('load', function(){
   if(!mySession.getItem("pageCount")){
      mySession.setItem('pageCount', 1);
   } else {
      pageCount = mySession.getItem("pageCount");
      pageCount = pageCount + 1;
      mySession.setItem('pageCount', pageCount );
   }
   console.log('page view count of current browsing session', mySession.getItem("pageCount"));
});