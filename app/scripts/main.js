function BeerTeller() {
	"use strict";

	var tree = {};

	this.init = function() {
		document.body.style.background = "#" + randomHexColour();
	}

	function randomHexColour() {
		return Math.random().toString(16).slice(-6);
	}

	function next() {

	}

	function restart() {

	}
}

window.onload = function() {
	var beerTeller = new BeerTeller();
	beerTeller.init();
}