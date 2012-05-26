var exec = require('child_process').exec
  ,   fs = require('fs')
, mkdirp = require('mkdirp')
  , path = require('path')
  , util = require('util');

/* Constructor providing some defaults. */
function PDFLatex(inputPath) {
	this.outputDirectory = process.cwd() + "/";
	this.inputPath = inputPath;
};

/* Allow changing the output directory. */
PDFLatex.prototype.setOutputDir = function(path) {
	this.outputDirectory = path;
	return this;
};

validateInput = function(input) {
	if (input.length > 0) {
		path.exists(input, function(exists) {
			if (!exists) {
				throw new Error("Invalid input provided. Does the file exist?");
			}
		});
	}
	return true;
};

validOutputDir = function(dir) {
	var outputDir = dir;
	fs.lstat(outputDir, function(err, stats) {
			if (!err && stats.isDirectory()) {
				return true;
			} else if (!err && stats.isFile()){
				throw new Error("Cannot write to " + outputDir + ", it is a file");
				return false;
			} else {
				mkdirp(outputDir, function(err) {
						if (err) console.error(err);
				});
				return true;
			}
	});
	return true;
};

PDFLatex.prototype.typeset = function() {
	if (validOutputDir(this.outputDirectory)) {
		if (validateInput(this.inputPath)) {
			var command = "pdflatex -output-directory " +
			    this.outputDirectory + " '" + this.inputPath + "'";
			util.puts(command);
			exec(command, function(err) {
				if (err) throw err;
			});
		}
	} else {
		return false;
	}
};

module.exports = PDFLatex;
