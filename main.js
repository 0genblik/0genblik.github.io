$(document).ready(function(){
	$('.header').height($(window).height());
})

function searchFunc() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue, box;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName('li');
    box = document.getElementById("box");
	

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
	  a = li[i].getElementsByTagName("a")[0];
	  txtValue = a.textContent || a.innerText;
	  if (filter) {
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			console.log(li[i])
			box.style.display = "block";
			li[i].style.display = "block";
		  } else {
			li[i].style.display = "none";
		  }
	  }
	  else {
		box.style.display="none"
		li[i].style.display = "none"
		  
	  }

	}
  }




const navbar = document.querySelector('.navbar');

scrollPos = function () {
	if (window.scrollY >= 120) {
		navhidden()
	  } 
	else {
		navdefault()
	  }
}

navdefault = function () {
	navbar.classList.add("navbar-colour");
	navbar.classList.remove("added-scroll");
}

navhidden = function () {
	navbar.classList.add("added-scroll");
	navbar.classList.remove("navbar-colour");
	box.style.display="none"
}

window.onload = function setNavbar() {
	navdefault()
}

window.addEventListener('scroll', (e) => {   
	scrollPos()
  })

inputtest = false
hovertest = false

var hover = document.getElementById("hover");
var searchSelected = document.getElementById("myInput");
var typing = document.querySelector("form.form-inline");

hover.addEventListener("mouseover", (c) => {
	hovertest=true;
	navdefault()
})

hover.addEventListener("mouseout", (d) => {
	hovertest=false;
	if (inputtest) {
		navdefault()
	}		
	else {
		navhidden()
		scrollPos()
	}
})

searchSelected.addEventListener("focus", (a) => {
	inputtest=true
	navdefault()
	searchFunc()
})

searchSelected.addEventListener("blur", (b) => {
	inputtest=false;
	if (hovertest) {
		navdefault()
	}		
	else {
		navhidden()
		scrollPos()
	}
})

typing.addEventListener("keydown", (e) => {
	navdefault()
})



d3.json("data_breaches.json").then(function (data) {
	var width=1400;
	var height=1000;

	function sensy(d, height) {
		switch(d["data sensitivity"]) {
			case 1:
				return height*7/10
				break;
			case 2:
				return height*6/10
				break;
			case 3:
				return height*5/10
				break;
			case 4:
				return height*4/10
				break;	
			case 5:
				return height*3/10
				break;				
			default:
				return height/2
				break;
			
			}
		}




	var svg = d3.select("#chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(0,0)")

	var sepBubbles = d3.forceSimulation()
		.force("x", d3.forceX(width/2).strength(0.04))
		.force("y", d3.forceY(height/2).strength(0.04))	
		.force("collision", d3.forceCollide(function (d) {
			return radius(parseInt(d["records lost"]))
		}))

	var radius = d3.scaleSqrt().domain([1, 700,000,000]).range([1,50])
	var circles = svg.selectAll(".company")
		.data(data)
		.enter().append("circle")
		.attr("class", "company")
		.attr("r", function(d) {return radius(parseInt(d["records lost"])) })
		.attr("cx", width/2)
		.attr("cy", height/2)
		/*.force("y", d3.forceY(function (d, height) {
			switch(d["data sensitivity"]) {
				case 1:
					return height*7/10
					break;
				case 2:
					return height*6/10
					break;
				case 3:
					return height*5/10
					break;
				case 4:
					return height*4/10
					break;	
				case 5:
					return height*3/10
					break;				
				default:
					return height/2
					break;
				
				}
			}).strength(1))	*/
		.attr("stroke", "black")
		.attr("fill", function(d) {
		switch(d["data sensitivity"]) {
			case 1:
				return "#fee5d9"
				break;
			case 2:
				return "#fcae91"
				break;
			case 3:
				return "#fb6a4a"
				break;
			case 4:
				return "#de2d26"
				break;	
			case 5:
				return "#a50f15"
				break;				
			default:
				return "white"
				break;
			
			}
		}
		)

	/*1. Just email address/Online information 
	2. SSN/Personal details 
	3. Credit card information 
	4.Email password/Health records
	 5. Full bank account details*/





	sepBubbles.nodes(data)
		.on("tick", ticked)

	function ticked() {
		circles
		.attr("cx", function (d) {
			return d.x
		})
		.attr("cy", function (d) {
			return d.y
		})
	}
})