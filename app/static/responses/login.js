async function load_orgName(){
  return await fetch('/get_jobs')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          console.log(text[0]["orgName"])
          return text[0]["orgName"]
      });
};

     var form = $( 'form#login' ).on( 'submit', async function( e ) {
      e.preventDefault()

         var name = document.getElementById(name).value
        var formName = load_orgName()
        if (name === formName) {
             $("#hiddenAdmin").show();
        }

    } )