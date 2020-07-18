var x = document.getElementById("button")

x.addEventListener('click', () => {
    console.log("hello")
    var audio = document.createElement('audio');
    audio.src = 'file:///Users/sharonhe/chatapp/app/static/responses/sounds/welcome.mp3'
    audio.play();
})