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
const mock = require('../mock/id');

const repository = container => {

	const database = container.resolve('database');
	const tests = container.resolve('tests');
	const define = container.resolve('define');

	let collection = null;
	if (!tests.DB) {
		collection = database.collection('ids');
	}
	
	// Need line break
	const getAllIds = () => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(mock);
			} else {
				/*
				const users = [];
				const cursor = collection.find({}, {_id: false});

				const addUser = user => {
					users.push(user);
				}

				const sendUsers = err => {
					if (err) {
						reject(new Error('An error occurred fetching all users, error: ' + err));
					}
					resolve(users.slice());
				}

				cursor.forEach(addUser, sendUsers);
				*/
			}			
		});
	}

	const getId = id => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(mock[0]);
			} else {
				/*
				const projection = {_id: false};

				const sendUser = (err, user) => {
					if (err) {
						reject(new Error(`An error occurred fetching an user with id: ${id}, error: ${err}`));
					}
					resolve(user);
				}

				collection.findOne({id: id}, projection, sendUser);
				*/
			}
		});
	}

	const createId = id => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(id);				
			} else {
				/*
				collection.insertOne(user, (err, res) => {
					if (err) {
						reject(new Error('An error occurred creating a new user, error: ' + err));
					}
					resolve(user);
				});
				*/
			}
		});
	}

	const deleteId = id => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(true);
			} else {
				/*
				const query = {id: id};

				collection.deleteOne(query, (err, res) => {
					if (err) {
						reject(new Error('An error occurred deleting an user, error: ' + err));
					}
					resolve(res);
				});
				*/
			}
		});
	}

	const updateIdByName = (name, id) => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(true);
			} else {
				/*
				const query = {id: id};
				const value = {$set: {password: password}};

				collection.updateOne(query, value, (err, res) => {
					if (err) {
						reject(new Error('An error occurred updating user password, error: ' + err));
					}
					resolve(res);
				});
				*/
			}
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
		db.close();
	}

	return Object.create({
		getAllIds,
		getIdByName,
		createId,
		deleteIdByName,
		updateIdByName,
		genToken,
		disconnect
	});
}

const connect = container => {
	const tests = container.resolve('tests');
	
	return new Promise((resolve, reject) => {
		if (!tests.DB) {
			if (!container.resolve('database')) {
				reject(new Error('Connection DB not supplied!'));
			}			
		}
		resolve(repository(container));
	});
}

module.exports = Object.create({connect});
