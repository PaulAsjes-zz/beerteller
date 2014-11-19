var OptionManager = function(data) {
	this.tree = data;
	this.options = [];
};

OptionManager.prototype.addOption = function(el) {
	this.options.push(new Option(el));
};

OptionManager.prototype.removeOption = function(el) {

};

OptionManager.prototype.setOptionText = function(textArr) {
	for (var i = 0; i < this.options.length; i++) {
		this.options[i].setText(textArr[i]);
	}
};