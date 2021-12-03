$(document).ready(function(){
	$('.header').height($(window).height());
})





let userHasScrolled = false;  
window.addEventListener('scroll', (e) => {  
  userHasScrolled = true;  
})

const navbar = document.querySelector('.navbar');

navdefault = function () {
	navbar.classList.add("navbar-colour");
	navbar.classList.remove("added-scroll");
}

navhidden = function () {
	navbar.classList.add("added-scroll");
	navbar.classList.remove("navbar-colour");
}

window.onscroll = function () {
	if (window.scrollY >= 120) {
		navhidden()
    } 
    else {
		navdefault()
    }
}



inputtest = false
hovertest = false

var hover2 = document.getElementById("hover2");

hover2.addEventListener("focus", (a) => {
	inputtest=true
	navdefault()
})

hover2.addEventListener("blur", (b) => {
	inputtest=false;
	if (hovertest) {
		navdefault()
	}		
	else {
		navhidden()
	}
})

var hover1 = document.getElementById("hover1");

hover1.addEventListener("mouseover", (c) => {
	hovertest=true;
	navdefault()
})

hover1.addEventListener("mouseout", (d) => {
	hovertest=false;
	if (inputtest) {
		navdefault()
	}		
	else {
		navhidden()
	}
	
})
