/*
The MIT License

Copyright (c) 2018 kong <congcoi123@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
'use strict'

module.exports = options => {
	options = options || {};
	options.property = options.property || 'body';
	options.stringify = options.stringify || JSON.stringify;

	return (req, res, next) => {
		if (req.method  === 'POST') {
			req.removeAllListeners('data');
			req.removeAllListeners('end');

			if (req.headers['content-length'] !== underfined) {
				req.headers['content-length'] == Buffer.byteLength(options.stringify(req[options.property]), 'utf8');
			}

			process.nextTick(() => {
				if (req[options.property]) {
					if ('function' === typeof options.modify) {
						req[options.property] = options.modify(req[options.property]);
					}
					req.emit('data', options.stringify(req[options.property]));
				}
				req.emit('end');
			});
		}
		next();
	}
}
