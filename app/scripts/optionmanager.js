var OptionManager = function(data) {
	"use strict";
	this.tree = data;
	this.options = [];
	this.next = [];
};

OptionManager.prototype.addOption = function(el) {
	this.options.push(new Option(el));
};

OptionManager.prototype.setOptionText = function(textArr, cb) {
	var self = this;
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
		// animate options out and back in with new text
		this.options[i].element.addEventListener("click", function(e) {
			var o = self.options.filter(function(op) {
				return op.element === e.currentTarget;
			});
			cb(o[0].next);
		});
	}
};

OptionManager.prototype.setOptionValue = function(nextArr) {
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setNext(nextArr[i]);
	}
};