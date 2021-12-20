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
	var height=750;

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
		.append("div")
		// Container class to make it responsive.
		.classed("svg-container", true) 
		.append("svg")
		// Responsive SVG needs these 2 attributes and no width and height attr.
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 1400 750")
		// Class to make it responsive.
		.classed("svg-content-responsive", true)
		.append("g")
		.attr("transform", "translate(0,0)")

	var sepBubbles = d3.forceSimulation()
		.force("x", d3.forceX(width/2).strength(0.04))
		.force("y", d3.forceY(height/2).strength(0.04))	
		.force("collision", d3.forceCollide(function (d) {
			return radius(parseInt(d["records lost"].replaceAll(",",''))/2000000)
		}))

	





	
	var radius = d3.scaleSqrt().domain([1, 100000000]).range([1,35000])
	var circles = svg.selectAll(".company")
		.data(data)
		.enter().append("circle")
		.attr("class", "company")
		.attr("r", function(d) {return radius(parseInt(d["records lost"].replaceAll(",",'')))/1500})
		.attr("cx", width/2)
		.attr("cy", height/2)
		.attr("stroke", "black")
		.attr("stsroke-width", 1)
		.on("mouseover", function(event, d) {
			d3.select(this).classed("highlight", true);
			   // code to optimize to get data from object relevant to current highlighted bar
			  // 
			  	d3.select(this).attr("stroke-width", 4)
				console.log("year is:" + d.year + " and records lost: " + d["records lost"].replaceAll(",",''))
				d3.select("#display")
				.selectAll("p")
				.text("Organisation: " +d.organisation)
				.append("p")
				.text("Records Lost: " +d["records lost"])
				.append("p")
				.text("Date: " +d.date)
				.append("p")
				.text("Data Sensitivity: " +d["data sensitivity"])
				.append("p")
				.text("Sector: " +d.sector)
				/*.append("p")
				.text("Source: " +d["source name"])	
				.append("p")	
				.text("Source Link: " +d["1st source link"])	*/
		})
		.on("mouseout", function(event, d) {
			d3.select(this).classed("highlight", false);
			d3.select(this).attr("stroke-width", 1)
		})
		.attr("fill", function(d) {
			switch(d["data sensitivity"]) {
				case 1:
					return "#edf8fb"
					break;
				case 2:
					return "#b3cde3"
					break;
				case 3:
					return "#8c96c6"
					break;
				case 4:
					return "#8856a7"
					break;	
				case 5:
					return "#810f7c"
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
			return d.y})
		
	}
})



var subjectObject = {
	"Sector": {
	  "HTML": ["Links", "Images", "Tables", "Lists"],
	  "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
	  "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
	},
	"Year": {
	  "PHP": ["Variables", "Strings", "Arrays"],
	  "SQL": ["SELECT", "UPDATE", "DELETE"]
	},
	"Data Sensitivity": {
		"PHP": ["Variables", "Strings", "Arrays"],
		"SQL": ["SELECT", "UPDATE", "DELETE"]
	}
  }
  window.onload = function() {
	var subjectSel = document.getElementById("subject");
	var topicSel = document.getElementById("topic");
	var chapterSel = document.getElementById("chapter");
	for (var x in subjectObject) {
	  subjectSel.options[subjectSel.options.length] = new Option(x, x);
	}
	subjectSel.onchange = function() {
	  //empty Chapters- and Topics- dropdowns
	  chapterSel.length = 1;
	  topicSel.length = 1;
	  //display correct values
	  for (var y in subjectObject[this.value]) {
		topicSel.options[topicSel.options.length] = new Option(y, y);
	  }
	}
	topicSel.onchange = function() {
	  //empty Chapters dropdown
	  chapterSel.length = 1;
	  //display correct values
	  var z = subjectObject[subjectSel.value][this.value];
	  for (var i = 0; i < z.length; i++) {
		chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
	  }
	}
  } 