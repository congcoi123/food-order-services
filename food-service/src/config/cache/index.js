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

let client = null;
let test = false;

const connect = (cacheSettings, events, tests, mediator) => {
	test = tests.CACHE;
	if (test) {
		mediator.emit(events.cache.READY);
		return;
	}

	const redis = require('redis');
	client = redis.createClient({
		host: cacheSettings.host,
		password: cacheSettings.pass
	});

	client.on('ready', () => {
		mediator.emit(events.cache.READY);
	});

	client.on('error', err => {
		mediator.emit(events.cache.ERROR, err);
	});
}

const init = (prefix, callback) => {
	if (test) return;

	// Check existed recorder first
	client.get(prefix, (err, reply) => {
		if (err)
			return callback(err);
		if (reply)
			return callback(`${prefix} is available!`);
		client.set(prefix, JSON.stringify({}));
	});
}

const reset = prefix => {
	// Clear all recorders
	client.set(prefix, JSON.stringify({}));
}

const gets = prefix => {
	// Return the array of objects
	
}

const set = (prefix, key, object) => {
	client.set(`${prefix}${key}`, JSON.stringify(object));
}

const get = (prefix, key, callback) => {
	client.get(`${prefix}${key}`, (err, reply) => {
		return callback(err, JSON.parse(reply));
	});
}

const del = (prefix, key, callback) => {
	client.del(`${prefix}${key}`, (err, resp) => {
		callback(err, resp);
	});
}

const quit = () => {
	if (test) return;
	client.quit();
}

module.exports = Object.create({connect, init, reset, gets, set, get, del, quit});
