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

const repository = container => {

	if (container.resolve('tests').DB)
		return Object.create({});

	const {createContainer, asValue} = require('awilix');
	const database = container.resolve('database');
	const repo = createContainer();

	const category = require('./category.repo')(repo, database.collection('categories'));
	const group = require('./group.repo')(repo, database.collection('groups'));
	const pack = require('./package.repo')(repo, database.collection('packages'));
	const product = require('./product.repo')(repo, database.collection('products'));
	const retailer = require('./retailer.repo')(repo, database.collection('retailers'));
	const store = require('./store.repo')(repo, database.collection('stores'));

	repo.register({
		category: asValue(category),
		group: asValue(group),
		pack: asValue(pack),
		product: asValue(product),
		retailer: asValue(retailer),
		store: asValue(store)
	});

	const disconnect = () => {
		database.close();
	}

	return Object.create({
		category,
		group,
		pack,
		product,
		retailer,
		store,
		disconnect
	});
}

const connect = container => {
	return new Promise((resolve, reject) => {
		if (!container.resolve('database')) {
			return reject(new Error('Connection DB not supplied!'));
		}
		resolve(repository(container));
	});
}

module.exports = Object.create({connect});
