function Option(el) {
	"use strict";
	var next,
		self = this,
		text = "",
		element = el;

	this.setText = function(t) {
		self.text = t;
		element.innerHTML = t;
	};

	this.getText = function() {
		return self.text;
	};

	this.setNext = function(n) {
		self.next = n;
	}

	this.getNext = function() {
		return self.next;
	};
}