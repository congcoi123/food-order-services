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

const permissions = require('../config/permissions');

const repository = container => {

	if (container.resolve('tests').DB) {
		return Object.create({});
	}

	const database = container.resolve('database');
	const collection = database.collection('roles');
	
	const getAllPermissions = () => {
		return new Promise((resolve, reject) => {
			if (!permissions || !(permissions instanceof Array)) {
				return reject('No permissions was found!');
			}
			resolve(permissions);
		});
	}

	const getPermissionsByRoleId = id => {
		return new Promise((resolve, reject) => {
			collection.findOne({_id: id}, (err, doc) => {
				if (err) {
					return reject(err);
				}
				if (!doc) {
					return reject(`Permissions of role '${id}' was not found!`);
				}
				if (!doc.enable) {
					return reject('This role was disabled!');
				}
				resolve(doc.permissions);
			});
 		});
	}

	const getAllRoles = () => {
		return new Promise((resolve, reject) => {
			resolve('Not available');	
		});
	}

	const getRoleById = id => {
		return new Promise((resolve, reject) => {
			collection.findOne({_id: id}, (err, doc) => {
				if (err) {
					return reject(err);
				}
				if (!doc) {
					return reject(`Role '${id}' was not found!`);
				}
				resolve(doc);
			});
		});
	}

	const createRole = role => {
		return new Promise((resolve, reject) => {
			collection.insertOne(role, (err, r) => {
				if (err) {
					return reject(err);
				}
				resolve(role);
			});
		});
	}

	const deleteRoleById = id => {
		return new Promise((resolve, reject) => {
			collection.deleteOne({_id: id}, (err, r) => {
				if (err) {
					return reject(err);
				}
				resolve(id);
			});
		});
	}

	const updateRoleById = (id, role) => {
		return new Promise((resolve, reject) => {
			resolve('Not available');
		});
	}

	const disconnect = () => {
		database.close();
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
	return new Promise((resolve, reject) => {
		if (!container.resolve('database')) {
			return reject(new Error('Connection DB not supplied!'));
		}
		resolve(repository(container));
	});
}

module.exports = Object.create({connect});
