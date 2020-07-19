async function add_jobs(job, scrolled){
  if( typeof job.orgName !== 'undefined' ) {
    var orgName = await load_orgName()
      var jobTitle = await load_jobTitle()

    var content = '<div class="container">' + '<b style="color:#000" class="right">'+orgName.name+'</b><p>' + orgName.jobTitle +'</p><span class="time-right">' + n + '</span></div>'
    if (orgName == orgName.name){
      content = '<div class="container darker">' + '<b style="color:#000" class="left">'+orgName.name+'</b><p>' + orgName.jobTitle +'</p><span class="time-left">' + n + '</span></div>'
    }
    // update div
    var messageDiv = document.getElementById("messages")
    messageDiv.innerHTML += content
  }

  if (scrolled){
    scrollSmoothToBottom("messages");
  }
}

function scrollSmoothToBottom (id) {
    var div = document.getElementById(id);
    $('#' + id).animate({
        scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
}


async function load_jobTitle(){
  return await fetch('/get_jobs')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          console.log(text[0]["jobTitle"])
          return text[0]["jobTitle"]
      });
};



async function load_orgName(){
  return await fetch('/get_jobs')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          console.log(text[0]["orgName"])
          return text[0]["orgName"]
      });
};


async function load_name(){
  return await fetch('/get_name')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          return text["name"]
      });
};

async function load_jobs() {
  return await fetch('/get_jobs')
   .then(async function (response) {
      return await response.json();
  }).then(function (text) {
      return text
  });
}


window.onload = async function() {
  var jobs = await load_jobs()
  for (i = 0; i < jobs.length; i++){
    scrolled = false
    if (i == jobs.length-1) {jobs = true}
    add_jobs(jobs[i], scrolled)
  }

  let name = await load_name()
  if (name != ""){
    $("#login").hide();
  }else{
    $("#logout").hide();
  }

}