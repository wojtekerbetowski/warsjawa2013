$(document).ready(function () {
    $.ajax("http://46.105.25.37:8181/confirm/" + window.location.search.substring(3))
        .success(function() {
            $("h4").text("REzErwacja potwIErdzona!");
        })
        .fail(function() {
            alert("Błąd! Może źle skopiowałeś link?\n" +
                "Jeśli problem nadal będzie występował skontaktuj się z Kapitułą Warsjawy");
            $("h4").text("WystąpIL bLąd!");
        })
});