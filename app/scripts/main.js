function BeerTeller() {
	"use strict";

	var tree = {};

	this.init = function() {
		document.body.style.background = "#" + randomHexColour();

		callAjax("data/data.json", function(data) {
			tree = data;
		});

		console.log(tree);
	}

	function randomHexColour() {
		return Math.random().toString(16).slice(-6);
	}

	function next() {

	}

	function restart() {

	}

	function callAjax(url, callback){
	    var xmlhttp;
	    // compatible with IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function(){
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
	            callback(xmlhttp.responseText);
	        }
	    }
	    xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	}
}

window.onload = function() {
	var beerTeller = new BeerTeller();
	beerTeller.init();
}