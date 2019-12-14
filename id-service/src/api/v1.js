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

const _createPath = path => {
	return `${PREFIX}${path}`;
}

/**
* Main API of service
**/
module.exports = (app, repo, validateModel, validatePermission, serviceRole) => {
	/*
	* Routes that can be accessed only by autheticated users
	*/
	// Change new password
	// app.put(_createPath('/user'), validateModel('credential'), validatePermission('ID_UPDATE'), (req, res, next) => {
	app.put(_createPath('/user'), (req, res, next) => {
		res.status(status.OK).send('Not availabel');
		// Check existed ID

		// Change new password

		// Update role, etc

		// Return result (success/failed)

	});

	/*
	* Routes that can be accessed only by authenticated & authorized users
	*/
	// Get all ids
	// app.get(_createPath('/admin/ids'), validatePermission('ID_CONFIG'), (req, res, next) => {
	app.get(_createPath('/admin/ids'), (req, res, next) => {
		res.status(status.OK).send('Not availabel');
		// Return list ids

	});

	// Get id
	// cpp.get(_createPath('/admin/id'), validateModel('credential'), validatePermission('ID_CONFIG'), (req, res, next) => {
	app.get(_createPath('/admin/id'), validateModel('credential'), (req, res, next) => {
		const credential = req.query.credential;

		repo.getId(credential)
		.then(id => {
			const payload = {
				status: 1,
				data: {
					id: id
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

	// Delete id
	// app.delete(_createPath('/admin/id'), validateModel('credential'), validatePermission('ID_CONFIG'), (req, res, next) => {
	app.delete(_createPath('/admin/id'), validateModel('credential'), (req, res, next) => {
		const credential = req.body.credential;

		repo.deleteId(credential)
		.then(credential => {
			const payload = {
				status: 1,
				data: {
					credential: credential
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
}
