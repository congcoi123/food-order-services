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
* Collection: PACKAGE
*/

module.exports = [
	{
		_id: 'xxx-package-xxx',
		name: 'Combo Pizza + Soda',
		price: 120000,
		description: 'Pizza and Soda is the best',
		available: true,
		hl: 'en',
		images: [
			'http://images.com/pizza_soda_1.jpg',
			'http://images.com/pizza_soda_2.jpg',
			'http://images.com/pizza_soda_3.jpg'
		],
		products: [
			'xxx-pizza-xxx',
			'xxx-soda-xxx'
		],
		retailer: 'xxx-retailer-xxx'
	},
	{
		_id: 'yyy-package-yyy',
		name: 'Yakiniku Pizza',
		price: 100000,
		description: 'Only pizza',
		available: false,
		hl: 'en',
		images: [
			'http://images.com/pizza_1.jpg'
		],
		products: [
			'xxx-pizza-xxx'
		],
		retailer: 'yyy-retailer-yyy'
	},
	{
		_id: 'zzz-package-zzz',
		name: 'Coca Cola',
		price: 10000,
		description: 'Only Coca-Cola',
		available: true,
		hl: 'en',
		images: [
			'http://images.com/soda_1.jpg'
		],
		products: [
			'xxx-soda-xxx'
		],
		retailer: 'zzz-retailer-zzz'
	}
]
