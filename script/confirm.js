var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
} ();


$(document).ready(function () {
    $.ajax("http://46.105.25.37:8181/confirm/" + QueryString.v)
        .success(function() {
            $("h4").text("REzErwacja potwIErdzona!");
        })
        .fail(function() {
            alert("Błąd! Może źle skopiowałeś link?\n" +
                "Jeśli problem nadal będzie występował skontaktuj się z Kapitułą Warsjawy");
            $("h4").text("WystąpIL bLąd!");
        })
});