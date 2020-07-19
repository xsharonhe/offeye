async function load_orgName(){
  return await fetch('/get_jobs')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          console.log(text[0]["orgName"])
          return text[0]["orgName"]
      });
};


window.onload = () => {
    $("#hiddenAdmin").hide();
}
     var form = $( 'form#login' ).on( 'submit', async function( e ) {
      e.preventDefault()

         var name = document.getElementById(name).value
         console.log(name)
        var formName = load_orgName();
        if (name === "YOUTH HACKS") {
             $("#hiddenAdmin").show();
        }

    } )