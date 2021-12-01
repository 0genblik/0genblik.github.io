$(document).ready(function(){
	$('.header').height($(window).height());
})


var hover1 = document.getElementById("hover1");
	function hoverFunc1(){
	alert("Welcome to the Coral of Cool");
}

var hover2 = document.querySelector("h2.b");
	function hoverFunc2(){
	alert("Mission");
}

var hover3 = document.querySelectorAll("a.links")	;
	function hoverFunc3(){
	alert("Links");

}


hover1.addEventListener("mouseover", hoverFunc1);
hover2.addEventListener("mouseover", hoverFunc2);
hover3.addEventListener("mouseover", hoverFunc3);