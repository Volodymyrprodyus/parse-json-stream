# parse-json-stream
Stream JSON parser

This library is useful for parsing large streams of JSON data without the need
to wait for the whole data to finish downloading. In its current form, it's a
single function that receives chunks of async data and will call back with an
error, an object or neither, which means the stream has reached its end.

Usage:
```
const Parser = require('parse-json-stream');

let parser = new Parser(function (error, object) {
  if (error) {
    console.log(error.message);
  } else if (object) {
    console.log(object);
  } else {
    console.log('done');
  }
});

// call it on every new chunk of data
parser.parse(data);
```
