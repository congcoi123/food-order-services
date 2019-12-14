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

/**
* Collection: ID
*/

module.exports = {
	_id: 'kong',
	name: 'Kong',
	email: 'congcoi123@gmail.com',
	password: '*****',
	salt: '***',
	created: 1508208616,
	modified: 1508208616,
	enable: true,
	auth: true,
	permissions: [
		'role_read',
		'role_update',
		'role_config'
	],
	devices: {
		last: {
			id: 'yyy-yyy-yyy',
			os: 'ios',
			os_ver: '6.9',			
			app_ver: 2
		},
		list: [
			{
				id: 'xxx-xxx-xxx',
				os: 'android',
				os_ver: '4.9',			
				app_ver: 1
			},
			{
				id: 'yyy-yyy-yyy',
				os: 'ios',
				os_ver: '6.9',			
				app_ver: 2
			}
		]
	}
}
