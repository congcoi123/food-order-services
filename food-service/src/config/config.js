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

const _stringToBoolean = boolean => {
	return boolean === 'true';
}

/**
* MongoDB: Master - Slave
**/
const dbSettings = {
	db: process.env.DB,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	repl: process.env.DB_REPLS,
	servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
		'192.168.1.111:27017',
		'192.168.1.111:27018',
		'192.168.1.111:27019'
	],

	dbParameters: () => ({
		w: 'majority',
		wtimeout: 10000,
		j: true,
		readPreference: 'ReadPreference.SECONDARY_PREFERRED',
		native_parser: false
	}),

	serverParameters: () => ({ // Master
		autoReconnect: true,
		poolSize: 10,
		socketoptions: {
			keepAlive: 300,
			connectTimeoutMS: 30000,
			socketTimeoutMS: 30000
		}
	}),

	replsetParameters: (replset = '25min') => ({ // Slave
		replicaSet: replset,
		ha: true,
		haInterval: 10000,
		poolSize: 10,
		socketoptions: {
			keepAlive: 300,
			connectTimeoutMS: 30000,
			socketTimeoutMS: 30000
		}
	})
}

/**
* Cache configurations
*/
const cacheSettings = {
	host: process.env.CACHE_HOST,
	pass: process.env.CACHE_PASS
}

/**
* Server configurations
*/
const serverSettings = {
	ssl_enabled: _stringToBoolean(process.env.SSL_ENABLED),
	port: process.env.PORT,
	ssl: require('./ssl')
}

/**
* Server events and triggers
*/
const events = {
	db: {
		READY: 'db.ready',
		ERROR: 'db.error'
	},
	cache: {
		READY: 'cache.ready',
		ERROR: 'cache.error'
	},
	app: {
		INIT: 'app.init',
		CLOSE: 'app.close'
	},
	boot: {
		READY: 'boot.ready'
	},
	di: {
		READY: 'di.ready',
		ERROR: 'di.error'
	}
}

/**
* Test mode
*/
const tests = {
	DB: _stringToBoolean(process.env.TEST_MODE_DB),
	CACHE: _stringToBoolean(process.env.TEST_MODE_CACHE),
	EXCEPTION: _stringToBoolean(process.env.EXCEPTION_ENABLED)
}

module.exports = Object.create({cacheSettings, dbSettings, serverSettings, tests, events});
