async function add_messages(msg, scroll){
    if( typeof msg.name !== 'undefined' ) {
      var date = dateNow()
  
      if ( typeof msg.time !== "undefined") {
        var n = msg.time
      }else{
        var n = date
      }
      var global_name = await load_name()
  
      var content = '<div class="container">' + '<b style="color:#000" class="right">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-right">' + n + '</span></div>'
      if (global_name == msg.name){
        content = '<div class="container darker">' + '<b style="color:#000" class="left">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-left">' + n + '</span></div>'
      }
      // update div
      var messageDiv = document.getElementById("messagesBot")
      messageDiv.innerHTML += content
    }
  
    if (scroll){
      scrollSmoothToBottom("messagesBot");
    }
  }
  

  async function load_name(){
    return await fetch('/get_name')
         .then(async function (response) {
            return await response.json();
        }).then(function (text) {
            return text["name"]
        });
  };
  
  
  async function load_messages() {
    return await fetch('/clean')
     .then(async function (response) {
        return await response.json();
    }).then(function (text) {
        return text
    });
  }
  
  
  $(function()
  {
    $('.msgs') .css({'height': (($(window).height()) * 0.7)+'px'});
  
    $(window).bind('resize', function(){
        $('.msgs') .css({'height': (($(window).height()) * 0.7)+'px'});
    });
  });
  
  
  function scrollSmoothToBottom (id) {
   var div = document.getElementById(id);
   $('#' + id).animate({
      scrollTop: div.scrollHeight - div.clientHeight
   }, 500);
  }
  
  
  function dateNow() {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);
  
    if (gg < 10)
        gg = "0" + gg;
  
    if (mm < 10)
        mm = "0" + mm;
  
    var cur_day = aaaa + "-" + mm + "-" + gg;
  
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();
  
    if (hours < 10)
        hours = "0" + hours;
  
    if (minutes < 10)
        minutes = "0" + minutes;
  
    if (seconds < 10)
        seconds = "0" + seconds;
  
    return cur_day + " " + hours + ":" + minutes;
  }
  
  
  var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on( 'connect', async function() {
      var usr_name = await load_name()
      if (usr_name != ""){
        socket.emit( 'event', {
          message: usr_name + ' just connected to the server!',
          connect: true
        } )
      }
      var form = $( 'form#msgForm' ).on( 'submit', async function( e ) {
        e.preventDefault()
  
        // get input from message box
        let msg_input = document.getElementById("msg")
        let user_input = msg_input.value
        let user_name = await load_name()
  
        // clear msg box value
        msg_input.value = ""
  
        // send message to other users
        socket.emit( 'event', {
          message : user_input,
          name: user_name
        } )
      } )
    } )

    socket.on( 'message response', async function( msg ) {
      await add_messages(msg, true)

      var fruits = ["Banana", "Orange", "Apple", "Mango"];
      for (let j = 0; j < fruits.length; j++) {
        console.log(fruits[j])
          if(msg.message ===(fruits[j])){
            function sendEmail() {
              console.log("I am running")
              Email.send({
                  SecureToken: "8c9eb67a-3199-4287-8415-5beff73515d9",
                  To : 'offeye123@gmail.com',
                  From : "offeye123@gmail.com",
                  Subject : "This",
                  Body : "This is a meaningful text"
              }).then(
                message => alert(message)
              );
              }
              sendEmail();
            setTimeout(async(robo, roboDiv) => {
              var robo = '<div class="container">' + '<b style="color:#000" class="right-robo"> JOB FINDER </b> I am a fruit. </p><span class="time-right"> now</span></div>'
              var roboDiv = document.getElementById("messagesBot")
              var speech = "I am a fruit."
            roboDiv.innerHTML += robo
            }, 1000)
      }}

    })
  
  window.onload = async function() {
    var msgs = await load_messages()
 
    for (i = 0; i < msgs.length; i++){
      scroll = false
      if (i == msgs.length-1) {scroll = true}
      add_messages(msgs[i], scroll)
    }
  
    let name = await load_name()
    if (name != ""){
      $("#login").hide();
    }else{
      $("#logout").hide();
    }
  
  }
