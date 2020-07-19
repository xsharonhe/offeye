var welcome = document.getElementById("submitButton2")

var x = document.getElementById("myAudio");
var y=document.createElement("source"); 

function playAudio() { 
    var audio = new Audio('https://github.com/xsharonhe/offeye/blob/master/welcome.mp3')
    audio.play();
}

function windowPopup() {
    window.open('https://github.com/OffEye-Developers-Hub')
}

welcome.addEventListener('click', () => {
    windowPopup();
})