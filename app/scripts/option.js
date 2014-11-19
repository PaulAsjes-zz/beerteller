var Option = function(el, cb) {
	"use strict";
	var next,
		callback = cb;
	
	this.copy = "",
	this.element = el;

	function enable(cb) {
		callback = cb;
		element.addEventListener("click", onClick);
	}

	function disable() {
		element.removeEventListener("click", onClick);
	}

	function onClick() {
		disable();
		callback();
	}

	// enable(cb);
};

Option.prototype.setText = function(t) {
	this.copy = t;
	this.element.innerHTML = t;
};

Option.prototype.getText = function() {
	return this.copy;
};

Option.prototype.setNext = function(n) {
	this.next = n;
}

Option.prototype.getNext = function() {
	return this.next;
};