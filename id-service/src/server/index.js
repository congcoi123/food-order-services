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

const express = require('express'); // Server handler
const morgan = require('morgan'); // Logging
const helmet = require('helmet'); // Secure
const status = require('http-status');
const bodyparser = require('body-parser'); // Parse request's body
const cors = require('cors');
const api = require('../api');

const start = container => {
	return new Promise((resolve, reject) => {
		const serverSettings = container.resolve('serverSettings');
		const validateRequest = container.resolve('validateRequest');
		const validateModel = container.resolve('validateModel');
		const validatePermission = container.resolve('validatePermission');
		const serviceRole = container.resolve('serviceRole');
		const repo = container.resolve('repo');
		const tests = container.resolve('tests');

		if (!repo) {
			return reject(new Error('The server must be started with a connected repository'));
		}
		if (!serverSettings.port) {
			return reject(new Error('The server must be started with an available port'));
		}

		const app = express();
		app.use(morgan('dev'));
		app.use(cors());
		app.use(helmet());
		app.use(bodyparser.json());

		// Server requirement
		app.all('/*', (req, res, next) => {
			// CORS headers
			res.header("Access-Control-Allow-Origin", "*"); // Restrict it to the required domain
			res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
			// Set custom headers for CORS
			res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key');
			if (req.method == 'OPTIONS') {
				res.status(status.UNSUPPORTED_MEDIA_TYPE).send('METHOD UNSUPPORTED');
			} else {
				next();
			}
		});

		// Check if the token is valid
		// Only the requests that start with /v1/* will be checked for the token
		// Can check with V2, V3, etc
		// app.all('/api/v*', validateRequest);

		api.common(app, repo, validateModel, validatePermission, serviceRole); // Main API routes
		api.v1(app, repo, validateModel, validatePermission, serviceRole); // V1 API

		// If no route is matched by now, it must be a 404
		app.use((err, req, res, next) => {			
			if (tests.EXCEPTION) {
				const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
				res.status(status.NOT_FOUND).send('Route not found!\nRequest: ' + fullUrl + '\nError: ' + err);
			} else {
				res.status(status.NOT_FOUND).send('Route not found!');
			}			
		});

		// Start server
		if (serverSettings.ssl_enabled) {
			const spdy = require('spdy'); // HTTP/2
			const server = spdy.createServer(options.ssl, app).listen(serverSettings.port, () => resolve(server));
		} else {
			const server = app.listen(serverSettings.port, () => resolve(server));
		}
  	});
}

module.exports = Object.create({start});
