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
* Collection: PRODUCT
*/

module.exports = [
	{
		_id: 'xxx-pizza-xxx',
		name: 'Yakiniku Pizza',
		category: 'PIZZA',
		group: 'pizza_yaki',
		description: 'A pizza with barbecue',
		note: 'A lot of calories',
		images: [
			'http://images.com/pizza_1.jpg',
			'http://images.com/pizza_2.jpg',
			'http://images.com/pizza_3.jpg'
		],
		optional: {
			wrapper: [
				'thick', 'thin'
			],
			sauce: [
				'tomato', 'chili'
			]
		},
		retailer: 'xxx-retailer-xxx'
	},
	{
		_id: 'xxx-soda-xxx',
		name: 'Coca-Cola',
		category: 'SODA',
		group: 'coca',
		description: 'No description becauseof its famous',
		note: 'A lot of calories',
		images: [
			'http://images.com/coca_1.jpg'
		],
		optional: {
			type: [
				'can', 'paper', 'bottle'
			]
		},
		retailer: 'yyy-retailer-yyy'
	}
]
