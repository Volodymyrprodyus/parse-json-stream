"use strict";

const Assert = require("assert");
const Parser = require("./index");

let done = false;
let errors = [];
let objects = [];

let parser = new Parser(function (error, object) {
	if (error) {
		errors.push(error.message);
	} else if (object) {
		objects.push(object);
	} else {
		done = true;
	}
});

parser.parse("[{\"one\": ");
parser.parse("1}, {\"tw");
parser.parse("o\": 1}]");
Assert.equal(errors.length, 0);
Assert.equal(objects.length, 2);
Assert.equal(done, true);
