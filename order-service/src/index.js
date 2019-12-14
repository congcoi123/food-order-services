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

const {EventEmitter} = require('events');
const mediator = new EventEmitter();
const server = require('./server');
const repository = require('./repository');
const di = require('./config');
// Bad organization :'(
const events = require('./config/config').events;
const tests = require('./config/config').tests;

console.log('----- ORDERS SERVICE -----');
console.log('Connecting to Order repository ...');

if (tests.EXCEPTION) {
	process.on('uncaughtException', err => {
		console.error('Unhandled Exception', err);
	});

	process.on('uncaughtRejection', (err, promise) => {
		console.error('Unhandled Rejection', err);
	});
}

// After connected to DB, try to start the server
mediator.on(events.di.READY, container => {
	console.log('DI.READY');
	repository.connect(container)
		.then(repo => {
			console.log('Connected DB. Starting server ...');
			container.registerValue({repo}); // Add repository as 'repo' to container
			return server.start(container);
		})
		.then(app => { // Result of {server.start}
			console.log(`Server started successfully, running on port: ${container.cradle.serverSettings.port}.`);
			app.on(events.app.CLOSE, () => {
				container.resolve('repo').disconnect();
			});
		})
});

di.init(mediator); // Set mediator to DI

// Start the service --> Connect DB
// DB connected --> Initialize the DI
// DI ready --> Connect repository
// Repository connected --> Start the server
mediator.emit(events.app.INIT);
