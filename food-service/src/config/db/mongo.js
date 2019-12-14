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

const mongo = require('mongodb');

const _getMongoURL = dbSettings => {
	const url = dbSettings.servers.reduce((prev, cur) => prev + cur + ',', 'mongodb://');

	return `${url.substr(0, url.length - 1)}/${dbSettings.db}`
}

module.exports = (dbSettings, events, tests, mediator) => {
	mediator.once(events.boot.READY, () => {
		console.log('BOOT.READY');
		if (tests.DB) {
			mediator.emit(events.db.READY, 'fakedb');
		} else {
			/* Master - Slave connect
			mongo.connect(_getMongoURL(dbSettings, {
				db: dbSettings.dbParameters(),
				server: dbSettings.serverParameters(),
				replset: dbSettings.replsetParameters(dbSettings.repl)
			}), (err, db) => {
				if (err) {
					mediator.emit(events.db.ERROR, err);
				} else {
					db.admin().authenticate(dbSettings.user, dbSettings.pass, (err, result) => {
						if (err) {
							mediator.emit(events.db.ERROR, err);
						} else {
							mediator.emit(events.db.READY, db);
						}
					});
				}
			});
			*/
			// Normal connection
			mongo.connect('mongodb://mongo:27017', {
				db: dbSettings.dbParameters(),
				server: dbSettings.serverParameters()
			}, (err, db) => {
				if (err) {
					mediator.emit(events.db.ERROR, err);
				} else {
					db.admin().authenticate(dbSettings.user, dbSettings.pass, (err, result) => {
						if (err) {
							mediator.emit(events.db.ERROR, err);
						} else {
							mediator.emit(events.db.READY, db);
						}
					});
				}
			});
		}		
	});
}
