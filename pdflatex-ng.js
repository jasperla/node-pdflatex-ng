var exec = require('child_process').exec
  ,   fs = require('fs')
  , path = require('path')
  , util = require('util');

function PDFLatex(inputPath) {
	this.outputDirectory = process.cwd() + "/";
	this.inputPath = inputPath;
};

PDFLatex.prototype.outputDir = function(path) {
	this.outputDirectory = path;
	return this;
};

PDFLatex.prototype.process = function() {
//	if (validateInput(this.inputPath)) {
	if (this.inputPath && this.inputPath.length > 0) {
		var command = "pdflatex -output-directory " +
		    this.outputDirectory + " '" + this.inputPath + "'";
		util.puts(command);
		exec(command, function(err) {
			if (err) throw err;
		});
	} else {
		throw new Error("Invalid input provided. Does the file exist?");
	}
};

module.exports = PDFLatex;
