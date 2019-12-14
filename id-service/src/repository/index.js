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
const key = require('../config/secret');

const repository = container => {

	if (container.resolve('tests').DB) {
		return Object.create({});
	}

	const database = container.resolve('database');
	const define = container.resolve('define');

	const collection = database.collection('ids');
	
	const getAllIds = () => {
		return new Promise((resolve, reject) => {
			resolve('Not available');	
		});
	}

	const getIdWithPass = credential => {
		return new Promise((resolve, reject) => {
			collection.findOne({_id: credential._id, pass: credential.pass}, (err, doc) => {
				if (err) {
					return reject(err);
				}
				if (!doc) {
					return reject(`ID '${credential._id}' was not found!`);
				}
				resolve(doc);
			});
		});
	}

	const getId = credential => {
		return new Promise((resolve, reject) => {
			collection.findOne({_id: credential}, (err, doc) => {
				if (err) {
					return reject(err);
				}
				if (!doc) {
					return reject(`ID '${credential}' was not found!`);
				}
				resolve(doc);
			});
		});
	}

	const createId = id => {
		return new Promise((resolve, reject) => {
			collection.insertOne(id, (err, r) => {
				if (err) {
					return reject(err);
				}
				resolve(id);
			});
		});
	}

	const updateId = id => {
		return new Promise((resolve, reject) => {
			resolve('Not available');
		});
	}

	const deleteId = credential => {
		return new Promise((resolve, reject) => {
			collection.deleteOne({_id: credential}, (err, r) => {
				if (err) {
					return reject(err);
				}
				resolve(credential);
			});
		});
	}

	const genToken = (id, permissions) => {
		const expires = _expiresIn(define.SESSION_EXP);
		const token = jwt.encode({
			id: id,
			exp: expires,
			permissions: permissions
		}, key());

		return token;
	}

	const _expiresIn = days => {
		const date = new Date();
		return date.setDate(date.getDate() + days);
	}

	const disconnect = () => {
		database.close();
	}

	return Object.create({
		getAllIds,
		getIdWithPass,
		getId,
		createId,
		deleteId,
		updateId,
		genToken,
		disconnect
	});
}

const connect = container => {
	return new Promise((resolve, reject) => {
		if (!container.resolve('database')) {
			return reject(new Error('Connection DB not supplied!'));
		}
		resolve(repository(container));
	});
}

module.exports = Object.create({connect});
