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

const express = require('express');
// const spdy = require('spdy');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const proxy = require('../vendor/proxy');
const restreamer = require('../vendor/restreamer');
const services = require('../services/services.json');

const start = options => {
	return new Promise((resolve, reject) => {
		if (!options.port) {
			reject(new Error('The server must be started with an available port'));
		}

		// Set up the server
		const app = express();
		app.use(morgan('dev'));
		app.use(helmet());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(cookieParser());

		// Headers
		app.all('/*', (req, res, next) => {
			// CORS headers
			res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
			res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
			// Set custom headers for CORS
			res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key');
			if (res.method === 'OPTIONS') {
				reject(new Error('Not supported the OPTIONS method'));
				res.status(200).send('Not supported the OPTIONS method');
			} else {
				next();
			}
		});

		// Server error
		app.use((err, req, res, next) => {
			reject(new Error('Something went wrong!, Error: ' + err));
			res.status(500).send('Something went wrong!');
		});

		// Ping
		app.all('/', (req, res) => {
			res.status(200).json({
				message: 'API Gateway is alive!'
			});
		});

		// Bootstrap services
		for (let i = 0; i < services.length; i++) {
			const name = services[i].name;
			const host = services[i].host;
			const port = services[i].port;
			const path = services[i].path || '';
			const protocol = services[i].protocol || 'http';

			console.log(`Boostrapping service: ${protocol}://${host}:${port}/${path}`);

			let middleware = []; // Can handle mutiple middleware
			if (services[i].middleware) {
				middleware.push(require(`../middleware/${services[i].middleware}`));
			}

			// Need to restream the request so that it can be proxied
			middleware.push(restreamer());

			app.use(`/api/${name}*`, middleware, (req, res, next) => {
				const newPath = url.parse(req.originalUrl).pathname.replace(`/api/${name}`, path);
				console.log(`Forwarding request to: ${newPath}`);
				proxy.web(req, res, {target: `${protocol}://${host}:${port}/${newPath}`}, next);
			});
		}

		const server = app.listen(options.port, () => resolve(server));
		// const server = spdy.createServer(options.ssl, app).listen(options.port, () => resolve(server));
	});
}

module.exports = Object.assign({}, {start});
