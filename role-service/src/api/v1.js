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

const status = require('http-status');

const PREFIX = '/api/v1';
const PREFIX_ROLE = 'role.r_';

const _createPath = path => {
	return `${PREFIX}${path}`;
}

/**
* Main API of service
**/
module.exports = (app, cache, repo, validateModel, validatePermission) => {
	/*
	* Routes that can be accessed only by autheticated users
	*/
	// Nothing

	/*
	* Routes that can be accessed only by authenticated & authorized users
	*/
	// Get all permissions
	app.get(_createPath('/admin/permissions'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		repo.getAllPermissions()
		.then(permissions => {
			const payload = {
				status: 1,
				data: {
					permissions: permissions
				}
			};
			res.status(status.OK).send(payload);
		})
		.catch(err => {
			const payload = {
				status: 0,
				data: {
					error: err
				}
			};
			res.status(status.OK).send(payload);
		});
	});

	// Get all roles
	app.get(_createPath('/admin/roles'), (req, res, next) => {
	// app.get(_createPath('/admin/roles'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Not available!');
	});

	// Get role
	app.get(_createPath('/admin/role'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/role/:id'), validateModel('id'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.getRoleById(id)
		.then(role => {
			const payload = {
				status: 1,
				data: {
					role: role
				}
			};
			res.status(status.OK).send(payload);
		})
		.catch(err => {
			const payload = {
				status: 0,
				data: {
					error: err
				}
			};
			res.status(status.OK).send(payload);
		});
	});

	// Create role
	app.post(_createPath('/admin/role'), validateModel('role'), (req, res, next) => {
	// app.post(_createPath('/admin/role'), validateModel('role'), validatePermission('ROLE_CONFIG'), (req, res, next) => {
		const role = {
			_id: req.body._id,
			name: req.body.name ? req.body.name : req.body._id,
			description: req.body.description ? req.body.description : 'No description',
			immortal: false,
			enable: true,
			permissions: req.body.permissions
		};

		repo.createRole(role)
		.then(role => {
			const payload = {
				status: 1,
				data: {

				}
			};
			res.status(status.OK).send(payload);
		})
		.catch(err => {
			const payload = {
				status: 0,
				data: {
					error: err
				}
			};
			res.status(status.OK).send(payload);
		});
	});

	// Delete role
	app.delete(_createPath('/admin/role'), validateModel('id'), (req, res, next) => {
	// app.delete(_createPath('/admin/role/:id'), validateModel('id'), validatePermission('ROLE_CONFIG'), (req, res, next) => {		
		const id = req.body.id;

		repo.deleteRoleById(id)
		.then(id => {
			const payload = {
				status: 1,
				data: {

				}
			};
			cache.del(PREFIX_ROLE, id, (err, resp) => {
				// TODO: Check result here
			});
			res.status(status.OK).send(payload);
		})
		.catch(err => {
			const payload = {
				status: 0,
				data: {
					error: err
				}
			};
			res.status(status.OK).send(payload);
		});
	});

	// Update role
	app.put(_createPath('/admin/role'), validateModel('role'), (req, res, next) => {
	// app.put(_createPath('/admin/role/:id'), validateModel('role'), validatePermission('ROLE_UPDATE'), (req, res, next) => {
		res.status(status.OK).send('Not available!');
		// TODO: Update cache
	});
}
