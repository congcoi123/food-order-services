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
module.exports = (app, repo, validateModel, validatePermission, serviceRole) => {
	/*
	* Routes that can be accessed only by autheticated users
	*/
	// Order
	app.post(_createPath('/customer/order'), (req, res, next) => {
		// Check order

		// Return result (success/failed)

		// Push notification to store (store must be registed/logined)

	});

	// Change new password
	app.put(_createPath('/user/:name'), validateModel('name'), validatePermission('id_update'), (req, res, next) => {
		// Check existed ID

		// Change new password

		// Update role, etc

		// Return result (success/failed)

	});

	/*
	* Routes that can be accessed only by authenticated & authorized users
	*/
	// Get all ids
	app.get(_createPath('/admin/ids'), validatePermission('id_config'), (req, res, next) => {
		// Return list ids

	});

	// Get id
	app.get(_createPath('/admin/id/:name'), validateModel('name'), validatePermission('id_config'), (req, res, next) => {
		// Check existed ID

		// Return result and ID (if existed)

	});

	// Delete id
	app.delete(_createPath('/admin/id/:name'), validateModel('name'), validatePermission('id_config'), (req, res, next) => {
		// Check existed ID

		// Delete ID

		// Return result (success/failed)

	});
}
