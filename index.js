"use strict";

module.exports = class {
	constructor(callback) {
		this.brackets = 0;
		this.callback = callback;
		this.cursor = 0;
		this.data = "";
	}

	parse(data) {
		this.data += data;
		let braces = 0;

		for (let i = this.cursor; i < this.data.length; ++i) {
			switch (this.data[i]) {
			case "[":
				if (++this.brackets == 1) {
					this.cursor = i + 1;
				}

				break;

			case "{":
				if (++braces == 1) {
					this.cursor = i;
				}

				break;
				
			case "}":
				console.log(braces);
				if (--braces == 0) {
					const string = this.data.substring(this.cursor, i + 1);

					try {
						this.callback(null, JSON.parse(string));
					} catch (error) {
						this.callback(new Error(`${error.message} while parsing ${string}`));
					}
	
					this.cursor = i + 1;
				}

				break;
				
			case "]":
				if (--this.brackets == 0) {
					this.callback();
					this.cursor = i;
				}

				break;
			}
		}
	}
};
