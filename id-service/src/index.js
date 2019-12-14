'use strict'

const {EventEmitter} = require('events');
const mediator = new EventEmitter();
const server = require('./server');
const repository = require('./repository');
const di = require('./config');
// Bad organization :'(
const events = require('./config/config').events;
const tests = require('./config/config').tests;

console.log('----- IDS SERVICE -----');
console.log('Connecting to ID repository ...');

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