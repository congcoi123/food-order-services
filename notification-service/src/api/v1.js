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

const PREFIX = '/v1';

const _createPath = path => {
	return PREFIX + path;
}

/**
* Main API of service
**/
module.exports = (app, repo, validateModel, validatePermission) => {
	/*
	* Routes that can be accessed only by autheticated users
	*/
	// Nothing

	/*
	* Routes that can be accessed only by authenticated & authorized users
	*/
	// Get all permissions
	app.get(_createPath('/admin/permissions'), validatePermission('role_read'), (req, res, next) => {
		// Get all permissions

		// Return permissions

		repo.getAllPermissions()
		.then(permissions => {
			res.status(status.OK).send(permissions);
		})
		.catch(next);
	});

	// Get all roles
	app.get(_createPath('/admin/roles'), validatePermission('role_read'), (req, res, next) => {
		// Get all roles

		// Return roles

		repo.getAllRoles()
		.then(roles => {
			res.status(status.OK).send(roles);
		})
		.catch(next);
	});

	// Get role
	app.get(_createPath('/admin/role/:id'), validateModel('id'), validatePermission('role_read'), (req, res, next) => {
		// Check existed role

		// Get role's data

		// Return data

		const id = req.params.id;
		repo.getRoleById(id)
		.then(role => {
			res.status(status.OK).send(role);
		})
		.catch(next);
	});

	// Create role
	app.post(_createPath('/admin/role'), validateModel('role'), validatePermission('role_config'), (req, res, next) => {
		// Check existed role

		// Create new role

		// Return all role's information

		repo.createRole(req.body)
		.then(role => {
			res.status(status.OK).send(role);
		})
		.catch(next);
	});

	// Delete role
	app.delete(_createPath('/admin/role/:id'), validateModel('id'), validatePermission('role_config'), (req, res, next) => {
		// Check existed role

		// Delete role

		// Return result (success/failed)

		const id = req.body.id;
		repo.deleteRoleById(id)
		.then(result => {
			res.status(status.OK).send(result);
		})
		.catch(next);
	});

	// Update role
	app.put(_createPath('/admin/role/:id'), validateModel('role'), validatePermission('role_update'), (req, res, next) => {
		// Check existed role

		// Update role's information

		// Return result and role data (if existed)

		const id = req.params.id;
		const role = req.body;
		repo.updateRoleById(id, role)
		.then(result => {
			res.status(status.OK).send(result);
		})
		.catch(next);
	});
}
