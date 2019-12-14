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

const jwt = require('jwt-simple');
const status = require('http-status');
const key = require('../config/secret');

module.exports = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) { // No access-token
		res.status(status.UNAUTHORIZED).send('Invalid Access Token!');
		return;
	}

	const decoded = jwt.decode(token, key()); // Decoded token

	if (!decoded.id || !decoded.exp || !decoded.permissions) { // Invalid parameters
		res.status(status.UNAUTHORIZED).send('Invalid Access Token: Wrong parameters!');
		return;
	}

	if (!decoded.permissions instanceof Array) { // Invalid format
		res.status(status.UNAUTHORIZED).send('Invalid Access Token: Wrong permissions format!');
		return;
	}

	if (decoded.exp <= Date.now()) { // Expired
		res.status(status.BAD_REQUEST).send('Token Expired!');
		return;
	}

	req.headers['jwt-decoded'] = JSON.stringify(decoded); // Decoded and transfer to the next middleware

	next(); // Move to the next middleware
}
