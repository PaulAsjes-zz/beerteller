var OptionManager = function(data, cb) {
	"use strict";
	this.tree = data;
	this.options = [];
	this.next = [];
	this.callback = cb;
	var self = this;
};

OptionManager.prototype.addOption = function(el) {
	this.options.push(new Option(el));
};

OptionManager.prototype.setOptionText = function(textArr) {
	var self = this;
	if (!textArr || textArr.length < 1) {
		return;
	}
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
		// animate options out and back in with new text
		this.options[i].element.addEventListener("click", function(e) {
			e.currentTarget.removeEventListener("click", arguments.callee);

			var o = self.options.filter(function(op) {
				return op.element === e.currentTarget;
			});

			self.callback(o[0].next);
		});
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