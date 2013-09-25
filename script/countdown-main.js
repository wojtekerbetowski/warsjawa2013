$(document).ready(function() {
    $("#count").countdown({
        //to change lunch date just replace the current date with yours .
        date: "october 12, 2013, 08:00",
        //html code in count div here.
        htmlTemplate: $('#count').html()
    });
});