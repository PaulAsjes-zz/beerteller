var OptionManager = function(data) {
	"use strict";
	this.tree = data;
	this.options = [];
	console.log(this);
};

OptionManager.prototype.addOption = function(el) {
	this.options.push(new Option(el));
	console.log(self);
};

OptionManager.prototype.setOptionText = function(textArr, cb) {
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
		// animate options out and back in with new text
		this.options[i].element.addEventListener("click", function(e) {
			// e.next = this.options[i].next;
			cb(e);
		});
	}
};

OptionManager.prototype.setOptionValue = function(nextArr) {
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setNext(nextArr[i]);
	}
};