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

const mock = require('../mock/role');

const repository = container => {

	const database = container.resolve('database');
	const tests = container.resolve('tests');

	let collection = null;
	if (!tests.DB) {
		collection = database.collection('roles');
	}
	
	const getAllPermissions = () => {
		return new Promise((resolve, reject) => {
			if (!permissions) {
				reject(new Error('No permissions was found!'));				
			}
			resolve(permissions);
		});
	}

	const getPermissionsByRoleId = roleId => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(mock[2].permissions);
			} else {

			}
 		});
	}

	const getAllRoles = () => {
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

	const getRoleById = id => {
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

	const createRole = role => {
		return new Promise((resolve, reject) => {
			if (tests.DB) {
				resolve(role);				
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

	const deleteRoleById = id => {
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

	const updateRoleById = (id, role) => {
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

	const disconnect = () => {
		db.close();
	}

	return Object.create({
		getAllPermissions,
		getAllRoles,
		getRoleById,
		createRole,
		deleteRoleById,
		updateRoleById,
		getPermissionsByRoleId,
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
