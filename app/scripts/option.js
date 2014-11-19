var Option = function(el, cb) {
	"use strict";	
	this.copy = "",
	this.element = el;
};

Option.prototype.setText = function(t) {
	this.copy = t;
	this.element.innerHTML = t;
};