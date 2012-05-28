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
	var rv = { "rc": "-1", "str": "" };

	if (input.length < 1) {
		rv = { "rc": "0",
		       "str": "Invalid input provided. Empty imput?"};
	}

	path.exists(input, function(exists) {
		if (!exists) {
			rv = { "rc": "0",
			       "str": "Invalid input provided. Does the file exist?"};
		}
	});

	if (rv.rc < 0) {
		rv = { "rc" : "1", "str": undefined };
	}

	return rv;
};

validOutputDir = function(dir) {
	var outputDir = dir;
	var rv = { "rc": "-1", "str": "" };

	fs.lstat(outputDir, function(err, stats) {
			if (!err && stats.isDirectory()) {
				rv = { "rc": "1", "str": "" };
			} else if (!err && stats.isFile()){
				rv = { "rc": "0",
				       "str": "Cannot write to " + outputDir + ", it is a file" };
			} else {
				mkdirp(outputDir, function(err) {
						if (err) console.error(err);
				});
				rv = { "rc": "1", "str": "" };
			}
	});

	if (rv.rc < 0) {
		rv = { "rc": "1", "str": undefined };
	}

	return rv;
};

PDFLatex.prototype.typeset = function() {
	var rvd = validOutputDir(this.outputDirectory);
	if (rvd.rc > 0) {
		var rv = validateInput(this.inputPath);
		if (rv.rc > 0) {
			var command = "pdflatex -output-directory " +
			    this.outputDirectory + " '" + this.inputPath + "'";
			util.puts(command);
			exec(command, function(err) {
				if (err) throw err;
			});
		} else {
			throw new Error(rv.str);
		}
	} else {
		throw new Error(rvd.str);
	}
};

module.exports = PDFLatex;
