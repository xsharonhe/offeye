async function add_messages(msg, scrolled){
    if( typeof msg.name !== "undefined" ) {
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

    if (scrolled){
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


    const pauseAudio = audio => {
      /*
      MUST PASS IN AN AUDIO FILE
       */
        audio.pause();
    }


    socket.on( 'message response', async function( msg ) {
      await add_messages(msg, true)
                if (msg.message === 'Show opportunities') {
            setTimeout(async (popup, popupDiv) => {
              var popup = '<div class="container">' + '<b style="color:#000" class="right-robo"> OffEye </b> <p> Here are the opportunities we found: </p> <table class="table table-hover"> <thead> <tr> <th scope="col">Organization</th><th scope="col">Opportunity</th><th scope="col">Description</th> <th scope="col"> Contact Information </th> </tr> </thead> <tbody> <tr class="table-info"> <th scope="row">YMCA</th> <td> <a href="https://ca.indeed.com/jobs?q=youth&l=Toronto%2C%20ON&vjk=60d4e47861e854a6&advn=1155404672915513">Youth Job Collection Program </a></td> <td>For youth from 15 to 29 to help them find employment</td> <td> info@ymca.ca</td> </tr> <tr> <tr class="table-success"> <th scope="row"> Toronto Humane Society </th> <td><a href="https://ca.indeed.com/jobs?q=youth&l=Toronto%2C%20ON&vjk=2c37a0b190c83cc0"> Marketing Intern </a></td> <td>Writeups for animal promotions </td> <td>humane@society.ca</td> </tr> </tr> <tr class="table-primary"> <th scope="row"> Foot Locker </th> <td> <a href="https://ca.indeed.com/jobs?q=youth&l=Toronto%2C%20ON&vjk=8d8d8bb9b8dd1829"> Sales Associate </a></td> <td>Enthusiasm with customers to sell shoes</td> <td>info@footlocker.ca</td> </tr> </tbody> </table> <span class="time-right"> now</span></div>'
              var popupDiv = document.getElementById("messagesBot")
              popupDiv.innerHTML += popup
            }, 1000)
          }
      let newsletter = ["Send newsletter", "send newsletter", "sendnewsletter", "Sendnewsletter"];
      for (let j = 0; j < newsletter.length; j++) {
        if (msg.message === (newsletter[j])) {
          function sendEmail() {
            Email.send({
              SecureToken: "8c9eb67a-3199-4287-8415-5beff73515d9",
              To: 'offeye123@gmail.com',
              From: "offeye123@gmail.com",
              Subject: "Here is more information about the Canada Job Expo for High School Students Just Like You!",
              Body: "https://www.eventbrite.ca/e/canada-job-expo-july-2020-now-a-virtual-event-tickets-95752713945"
            })
          }

          sendEmail();
          setTimeout(async (robo, roboDiv) => {
            function playAudio() {
              var audio = new Audio('https://github.com/xsharonhe/offeye/blob/master/welcome.mp3')
              audio.play();
            }
            playAudio()
            var robo = '<div class="container">' + '<b style="color:#000" class="right-robo"> OffEye </b> Hold on a second...</p><span class="time-right"> now</span></div>'
            var roboDiv = document.getElementById("messagesBot")
            roboDiv.innerHTML += robo
          }, 1000)
          setTimeout(async (robo, roboDiv) => {
            var robo = '<div class="container">' + '<b style="color:#000" class="right-robo"> OffEye </b> Email has been sent! </p><span class="time-right"> now</span></div>'
            var roboDiv = document.getElementById("messagesBot")
            roboDiv.innerHTML += robo
          }, 2000)

        }
        let joinCommunity = ["Join community"]
        for (let k = 0; k < joinCommunity.length; k++) {
          if (msg.message === (joinCommunity[j])) {
            setTimeout(async (robo, roboDiv) => {
              var popup = '<div class="container">' + '<b style="color:#000" class="right-robo"> OffEye </b> Window will popup soon! :) </p><span class="time-right"> now</span></div>'
              var popupDiv = document.getElementById("messagesBot")
              popupDiv.innerHTML += popup
            }, 1000)
            setTimeout(() => {
              window.open('https://github.com/OffEye-Developers-Hub')
            }, 2000)
          }
        }
      }
})

  window.onload = async function() {
    var msgs = await load_messages()

    for (i = 0; i < msgs.length; i++){
      scrolled = false
      if (i == msgs.length-1) {scrolled = true}
      add_messages(msgs[i], scrolled)
    }

    let name = await load_name()
    if (name != ""){
      $("#login").hide();
    }else{
      $("#logout").hide();
    }

  }
