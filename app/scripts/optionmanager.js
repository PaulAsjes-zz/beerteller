var OptionManager = function(data) {
	"use strict";
	this.tree = data;
	this.options = [];
};

OptionManager.prototype.addOption = function(el, cb) {
	this.options.push(new Option(el));
	var self = this;
	el.addEventListener("click", cb);
};

OptionManager.prototype.setOptionText = function(textArr) {
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
	}
};