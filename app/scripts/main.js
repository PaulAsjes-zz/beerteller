function BeerTeller() {
	"use strict";

	var tree,
		optionManager,
		identifier,
		current = 1;

	this.init = function(sIdentifier) {
		document.body.style.background = "#" + randomHexColour();

		identifier = sIdentifier;

		ajaxReq("data/data.json", start);
	};

	function randomHexColour() {
		// might want to do a little checking to make sure the colour selected is not too light
		return Math.random().toString(16).slice(-6);
	}

	function start(data) {
		tree = JSON.parse(data);

		optionManager = new OptionManager(tree, next);

		optionManager.addOption(document.querySelector(".left"));
		optionManager.addOption(document.querySelector(".right"));

		populate();
	}

	function populate() {
		var question = tree[identifier + current];
		var restartBtn = document.querySelector(".restart");

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
				restartBtn.style.display = "block";
				restartBtn.addEventListener("click", restart);
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

		// can probably do this a better way
		Velocity(document.querySelector(".question-text"), {opacity: 0}, {duration:250, complete: function() {
				populate();
				Velocity(document.querySelector(".question-text"), {opacity: 1}, {duration: 250});
			}
		});
	}

	function restart() {
		var restartBtn = document.querySelector(".restart");
		restartBtn.removeEventListener("click", restart);
		restartBtn.style.display = "none";

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