"use strict";

const assert = require("assert");
const Parser = require("./index");

const data = JSON.stringify({
	name: "sample",
	list: [
		{
			title: "basic",
			description: "basic object"
		},
		{
			title: "nesting",
			description: "nesting object",
			properties: {
				name: "nested",
				description: "nested object"
			}
		},
		{
			title: "complex",
			description: "complex object",
			list: [
				{
					title: "sample 1",
				},
				{
					title: "sample 2",
				},
				{
					title: "sample 3",
				}
			]
		}
	]
});

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

let cursor = 0;

while (cursor < data.length - 1) {
	const size = Math.floor((data.length - cursor) * Math.random());
	const chunk = data.substr(cursor, size);
	parser.parse(chunk);
	cursor += size;
}

assert.equal(errors.length, 0);
assert.equal(objects.length, 3);
assert.equal(done, true);
