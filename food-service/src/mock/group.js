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
* Collection: GROUP
*/

module.exports = [
	{
		_id: 'xxx-group-xxx',
		name: 'Yaki Pizza',
		description: 'The pizza with BBQ',
		parent: 'zzz-group-zzz', // parent MUST NOT BE in the children list
		children: [
			'abc-group-abc',
			'efg-group-efg'
		]
		retailer: 'xxx-retailer-xxx'
	},
	{
		_id: 'yyy-group-yyy',
		name: 'Seafood Pizza',
		description: 'The pizza with seafood (Shrimp, Octopus, Cuttle, etc)',
		parent: 'zzz-group-zzz',
		children: [
			'abc-group-abc'
		]
		retailer: 'yyy-retailer-yyy'
	}
]
