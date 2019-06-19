"use strict";

class Parser {
	constructor(callback) {
		this.brackets = 0;
		this.buffer = "";
		this.callback = callback;
		this.last = 0;
	}

	parse(data) {
		this.buffer += data;
		let begin = this.last;
		let braces = 0;

		for (let i = begin; i < this.buffer.length; ++i) {
			const TOKEN = this.buffer[i];

			if (TOKEN == "[") {
				++this.brackets;

				if (begin == this.last) {
					this.last = i + 1;
				}
			} else if (TOKEN == "{") {
				++braces;

				if (begin == this.last) {
					begin = i;
				}
			} else if (TOKEN == "}" && --braces == 0) {
				this.last = i + 1;
				const string = this.buffer.substring(begin, this.last);
				begin = this.last;

				try {
					this.callback(null, JSON.parse(string));
				} catch(error) {
					this.callback(new Error(error.message + " while parsing " + string));
				}
			} else if (TOKEN == "]" && --this.brackets == 0) {
				this.callback();
			}
		}
	}
}

module.exports = Parser;
