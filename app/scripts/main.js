function BeerTeller() {
	"use strict";

	var tree,
		left,
		right,
		optionManager,
		current = 1;

	this.init = function() {
		document.body.style.background = "#" + randomHexColour();

		callAjax("data/data.json", start);
	}

	function randomHexColour() {
		return Math.random().toString(16).slice(-6);
	}

	function start(data) {
		tree = JSON.parse(data);

		optionManager = new OptionManager(tree, next);

		optionManager.addOption(document.querySelector(".left"));
		optionManager.addOption(document.querySelector(".right"));

		populate();
	}

	function optionClicked(next) {
		
	}

	function populate() {		
		setQuestion(tree["q" + current]);
		optionManager.setOptionText(tree["q" + current].options, optionClicked);
		optionManager.setOptionValue(tree["q" + current].next);
	}

	function setQuestion(q) {
		var questionText = document.querySelector(".question-text");
		questionText.innerHTML = q.text;
	}

	function next(n) {
		current = n;

		console.log(n);
		populate();
	}

	function restart() {

	}

	function callAjax(url, callback){
	    // compatible with IE7+, Firefox, Chrome, Opera, Safari
	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200){
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