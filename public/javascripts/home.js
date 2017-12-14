// function pieced together from research on stack overflow particularly this question was helpful https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144
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

$(document).ready(function() {
    $('select').material_select();
    var member = getUrlParameter('member')
    $('#member').html(member)

});
