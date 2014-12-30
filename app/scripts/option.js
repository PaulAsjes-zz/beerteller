"use strict";

var Option = function(el, i) {
	this.copy = "";
	this.element = el;
	this.next = -1;
	this.id = i;
};

Option.prototype.setText = function(t) {
	this.copy = t;
	this.element.innerHTML = t;
};

Option.prototype.setNext = function(n) {
	this.next = n;
};

Option.prototype.hide = function() {
	this.element.style.display = "none";
};

Option.prototype.show = function() {
	this.element.style.display = "block";
};