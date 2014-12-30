"use strict";

var OptionManager = function(data, cb) {
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var self = this;

	this.tree = data;
	this.options = [];
	this.next = [];
	this.callback = cb;
	this.handler = isMobile ? "touchstart" : "click";

	/* Private functions */

	this.onOptionClick = function(e) {
		// 'this' is scoped to the element clicked
		e.currentTarget.removeEventListener(self.handler, self.onOptionClick);

		var optionClicked = self.options.filter(function(op) {
			return op.element === e.currentTarget;
		})[0];

		self.callback(optionClicked.next);
	};
};

OptionManager.prototype.addOption = function(el) {
	this.options.push(new Option(el, this.options.length));
};

OptionManager.prototype.setOptionText = function(textArr) {
	if (!textArr || textArr.length < 1) {
		return;
	}
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
		// animate options out and back in with new text
		this.options[i].element.addEventListener(this.handler, this.onOptionClick);
	}
};

OptionManager.prototype.hideOptions = function(option) {
	// hide all options if no arguments are passed through
	if (!option) {
		for (var i = 0; i < this.options.length; i++) {
			this.options[i].hide();
		}
	} else {
		// should probably do this in option.js
		option.style.display = "none";
	}
};

OptionManager.prototype.showOptions = function(option) {
	// show all options if no arguments are passed through
	if (!option) {
		for (var i = 0; i < this.options.length; i++) {
			this.options[i].show();
		}
	} else {
		option.style.display = "block";
	}
};

OptionManager.prototype.setOptionValue = function(nextArr) {
	if (!nextArr || nextArr.length < 1) {
		return;
	}
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setNext(nextArr[i]);
	}
};