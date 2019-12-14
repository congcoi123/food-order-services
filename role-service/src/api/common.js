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

const PREFIX = '/api/common';
const PREFIX_ROLE = 'role.r_';

const _createPath = path => {
	return `${PREFIX}${path}`;
}

/**
* Main API of service
**/
module.exports = (app, cache, repo, validateModel, validatePermission) => {
	/*
	* Routes that can be accessed by any one
	*/
	// Ping
	app.all('/', (req, res, next) => {
		res.status(status.OK).send('よっ!　生きてるよ〜 :)');
	});

	// Get permissions by role's id
	app.get(_createPath('/permission'), validateModel('id'), (req, res, next) => {
		const id = req.query.id;

		// Check in CACHE first
		cache.get(PREFIX_ROLE, id, (err, reply) => {
			// TODO: Check error HERE

			if (reply) { // Response now
				const payload = {
					status: 1,
					data: {
						permissions: reply.permissions
					}
				};
				res.status(status.OK).send(payload);
			} else { // Check in DB and put data to CACHE
				repo.getPermissionsByRoleId(id)
				.then(permissions => {
					const payload = {
						status: 1,
						data: {
							permissions: permissions
						}
					};
					cache.set(PREFIX_ROLE, id, {permissions: permissions});
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
			}
		});		
	});
}
