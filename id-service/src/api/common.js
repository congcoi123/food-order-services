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
const random = require('randomstring');

const PREFIX = '/api/common';

const _createPath = path => {
	return `${PREFIX}${path}`;
}

/**
* Main API of service
**/
module.exports = (app, repo, validateModel, validatePermission, serviceRole) => {
	/*
	* Routes that can be accessed by any one
	*/
	// Ping
	app.all('/', (req, res, next) => {
		res.status(status.OK).send('よっ!　生きてるよ〜 :)');
	});

	// Register
	app.post(_createPath('/register'), validateModel('register'), (req, res, next) => {
		// Get the role
		const role = req.body.role;
		// Get the permissions base on role
		serviceRole(role)
		.then(permissions => {
			const devices = {
				last: {

				},
				list: [

				]
			};
			const id = {
				_id: req.body._id,
				name: req.body.name ? req.body.name : req.body._id,
				email: req.body.email,
				pass: req.body.pass,
				salt: random.generate(5),
				created: Date.now(),
				modified: Date.now(),
				enable: true,
				auth: false,
				permissions: permissions,
				devices: devices
			};
			// Add to DB
			repo.createId(id)
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

	// Login
	app.post(_createPath('/login'), validateModel('login'), (req, res, next) => {
		const credential = {
			_id: req.body._id,
			pass: req.body.pass
		};

		repo.getIdWithPass(credential)
		.then(id => {
			const payload = {
				status: 1,
				data: {
					token: repo.genToken(id._id, id.permissions) // Generate the token
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
