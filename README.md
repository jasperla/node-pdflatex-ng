node-pdflatex-ng
================

Introduction
------------

node-pdflatex-ng is a wrapper around the pdflatex(1) command as distributed
with TeXlive/LaTeX to generate PDF/DVI files from .tex files.

It's an improved version based on the original node-pdflatex project
by oschrenk.

Installation
------------

	npm install node-pdflatex-ng

Usage
-----

	var PDFLatex = require('pdflatex-ng');
	var input = new PDFLatex("input.tex");
	try {
		input.process();
	} catch (err) {
		console.log(err);
	}

Author
-----

Copyright (C) 2012 Jasper Lievisse Adriaanse <jasper@humppa.nl>

Distributed under the BSD license (see the file COPYING).
