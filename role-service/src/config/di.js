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

const {createContainer, asValue} = require('awilix');

module.exports = ({cacheSettings, serverSettings, dbSettings, cache, database, validate, events, tests}, mediator) => {
	mediator.once(events.app.INIT, () => {
		console.log('APP.INIT');

		mediator.on(events.cache.READY, () => {
			console.log('CACHE.READY');
			
			// Ready to connect to Database
			database.connect(dbSettings, events, tests, mediator);
			// Boot ready --> Connect to Database
			mediator.emit(events.boot.READY);
		});

		mediator.on(events.db.READY, db => {
			console.log('DB.READY');

			const container = createContainer();

			container.register({
				serverSettings: asValue(serverSettings),
				dbSettings: asValue(dbSettings),
				cache: asValue(cache),
				database: asValue(db),
				validateModel: asValue(validate.model),
				validateRequest: asValue(validate.request),
				validatePermission: asValue(validate.permission),
				events: asValue(events),
				tests: asValue(tests)
			});

			// Database ready --> DI ready
			mediator.emit(events.di.READY, container);
		});

		// Cache error --> Database error
		mediator.on(events.cache.ERROR, err => {
			console.log('CACHE.ERROR');
			mediator.emit(events.di.ERROR, err);
		});

		// Database error --> DI error
		mediator.on(events.db.ERROR, err => {
			console.log('DB.ERROR');
			mediator.emit(events.di.ERROR, err);
		});

		// DI error --> SHUTDOWN with ERROR
		mediator.on(events.di.ERROR, err => {
			console.log(err);
			process.exit(1);
		});		

		// Ready to connect to Cache
		cache.connect(cacheSettings, events, tests, mediator);
	});
}
