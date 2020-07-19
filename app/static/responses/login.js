var welcome = document.getElementById("submitButton2")

var x = document.getElementById("myAudio");
var y=document.createElement("source"); 

function playAudio() { 
    y.src="file:///Users/sharonhe/Documents/chatapp/welcome.mp3";
    y.type="audio/mp3";
    x.appendChild(y);
    x.play(); 
}

welcome.addEventListener('click', () => {
    playAudio();
})