// function below pieced together from research on stack overflow
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(function(){
  console.log("in function");
    $("#from_signup").hide();
    var signup = getUrlParameter('from_signup')
    console.log(signup)
    if(typeof(signup)!= 'undefined'){
      $("#from_signup").show();
    }
});


function toggle_forms(){
  $('#signup').toggle()
  $('#login').toggle()
}
