$(document).ready(function() {
	$("#count").countdown({
		//to change lunch date just replace the current date with yours .
		date: "october 12, 2013",
		//html code in count div here.
		htmlTemplate: "<div id='days-count' class='numbers'>%{d}<span class='days-label'>days</span></div> <div id='hours-count' class='numbers'>%{h}<span class='hours-label'>hours</span></div><div id='min-count' class='numbers'>%{m}<span class='min-label'>min</span></div><div id='sec-count' class='numbers'>%{s}<span class='sec-label'>sec</span></div>"
	});
});


////////////////////animation script////////////////////////
var logoText = document.getElementById("logo"),
  text = logoText.innerHTML,
	chars = text.length,
	newText = '',
	i;	

for (i = 0; i < chars; i += 1) {
	newText += '<i>' + text.charAt(i) + '</i>';
}

logoText.innerHTML = newText;

var letters = document.getElementsByTagName('i'),
	flickers = [5, 7, 9, 11, 13, 15, 17],
	randomLetter,
	flickerNumber,
	counter;

function randomFromInterval(from,to) {
	return Math.floor(Math.random()*(to-from+1)+from);
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function flicker() {		
	counter += 1;
	
	if (counter === flickerNumber) {
		return;
	}

	setTimeout(function () {
		if(hasClass(randomLetter, 'off')) {
			randomLetter.className = '';
		}
		else {
			randomLetter.className = 'off';
		}

		flicker();
	}, 30);
}

(function loop() {
    var rand = randomFromInterval(500,3000);

	randomLetter = randomFromInterval(0, 3);
	randomLetter = letters[randomLetter];
	
	flickerNumber = randomFromInterval(0, 6);
	flickerNumber = flickers[flickerNumber];

    setTimeout(function() {
            counter = 0;
            flicker();
            loop();  
    }, rand);
}());

////////////////////show-hide tools panel////////////////////////
$("#show-hide").live("click", function(){ 
	if ($('#tools').is(':visible'))
		{$(this).html('+');$("#tools").hide();}
	else{$(this).html('-');$("#tools").show();}
 }); 

////////////////////show-hide contact form////////////////////////
$("#show-hide-contact").live("click", function(){ 
	if ($('#contact-form').is(':visible'))
		{$('#contact-form').hide();}
	else{$('#contact-form').show();}
 }); 

////////////////////skins selectors change////////////////////////
$("#blue-skin").live("click", function(){ 
	$("#container").attr("class","blue");
 }); 

$("#red-skin").live("click", function(){ 
	$("#container").attr("class","red");
 }); 

$("#purple-skin").live("click", function(){ 
	$("#container").attr("class","purple");
 }); 

$("#green-skin").live("click", function(){ 
	$("#container").attr("class","green");
 }); 


////////////////////patterns selectors change////////////////////////
$("#pat1").live("click", function(){ 
	 $('html').attr("class","bg1");
 }); 

$("#pat2").live("click", function(){ 
	$('html').attr("class","bg2");
 }); 

$("#pat3").live("click", function(){ 
	$('html').attr("class","bg3");
 }); 

$("#pat4").live("click", function(){ 
	$('html').attr("class","bg4");
 }); 