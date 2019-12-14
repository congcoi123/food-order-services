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
* Collection: ORDER
*/

module.exports = {
	_id: 'xxx-order-xxx',
	customer: 'xxx-customer-xxx',
	retailer: 'xxx-retailer-xxx',
	store: 'xxx-store-xxx',
	created: 1509591396,
	confirmed: 1509591408,
	finished: 1509591423,
	status: 'success',
	ship: {
		name: 'Kong',
		phone: '0804569870',
		address: 'Osaka City, Osaka'
	},
	packages: [
		{
			_id: 'xxx-package-xxx',
			products: [
				{
					_id: 'xxx-pizza-xxx',
					optional: {
						wrapper: 'thick',
						sauce: 'tomato'
					}
				},
				{
					_id: 'xxx-soda-xxx',
					optional: {
						type: 'can'
					}
				}
			],
			quantity: 2
		},
		{
			_id: 'yyy-package-yyy',
			products: [
				'xxx-pizza-xxx'
			],
			quantity: 1
		}
	]
}
