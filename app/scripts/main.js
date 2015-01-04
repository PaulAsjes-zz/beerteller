function BeerTeller() {
	"use strict";

	var tree,
		optionManager,
		identifier,
		current = 1,
		$restartBtn = document.querySelector(".restart"),
		$left = document.querySelector(".left"),
		$right = document.querySelector(".right");

	this.init = function(sIdentifier) {
		document.body.style.background = randomHexColour();

		identifier = sIdentifier;

		ajaxReq("data/data.json", start);
	};

	function randomHexColour() {
		// might want to do a little checking to make sure the colour selected is not too light
		return "#" + Math.random().toString(16).slice(-6);
	}

	function start(data) {
		tree = JSON.parse(data);

		optionManager = new OptionManager(tree, next);

		optionManager.addOption($left);
		optionManager.addOption($right);

		populate();
	}

	function populate() {
		var question = tree[identifier + current];

		if (!question) {
			console.error("Question does not exist!");
		} else {
			setQuestion(question);
			if (question.options) {
				optionManager.showOptions();

				optionManager.setOptionText(question.options);
				optionManager.setOptionValue(question.next);
			} else {
				optionManager.hideOptions();

				// restart functionality
				Velocity($restartBtn, {opacity: 1}, {
					duration: 250,
					display: "block"
				});
				$restartBtn.addEventListener("click", restart);
			}
		}
	}

	function setQuestion(q) {
		var questionText = document.querySelector(".question-text");
		questionText.innerHTML = q.text;
	}

	function next(n) {
		current = n;
		// animate question/options out, then populate
		Velocity($left, {marginLeft: "-100%"}, {duration: 250, easing: "easeInOut"});
		Velocity($right, {marginRight: "-100%"}, {duration: 250, easing: "easeInOut"});

		var $questionText = document.querySelector(".question-text");
		Velocity($questionText, {opacity: 0}, {duration:250,
			complete: function() {
				populate();
				Velocity($questionText, "reverse");
				Velocity($left, "reverse");
				Velocity($right, "reverse");
			}
		});
	}

	function restart() {
		$restartBtn.removeEventListener("click", restart);
		Velocity($restartBtn, {opacity: 0}, {
			duration: 250,
			display: "none"
		});

		Velocity(document.body, {
			backgroundColor: randomHexColour()
		});

		next(1);
	}

	function ajaxReq(url, callback){
	    // compatible with IE7+, Firefox, Chrome, Opera, Safari
	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200){
	            callback(xmlhttp.responseText);
	        }
	    };
	    xmlhttp.open("GET", url, true);
	    xmlhttp.send();
	}
}

window.onload = function() {
	var beerTeller = new BeerTeller();

	// specifier the unique identifier for the questions in the json file. 'q' in this case.
	beerTeller.init("q");
};