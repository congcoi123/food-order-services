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

const agenda = require('agenda');
const mongo = require('mongodb');
const db = null;
const schedule = null;

const start = async () => {
	db = await mongo.connect('mongodb://localhost:27017/agenda');

	// Agenda will use the given mongodb connection to persist data, so schedules
  	// will go in the "agenda" database's "schedule" collection.
	schedule = new agenda().mongo(db, 'schedule');

	// Wait for agenda to connect. Should never fail since connection failures
  	// should happen in the `await mongo.connect()` call.
	await new Promise(resolve => agenda.once('ready', resolve()));

	agenda.start();
}

const close = () => {
	db.close();
}

module.exports = Object.create({start, close, schedule});
