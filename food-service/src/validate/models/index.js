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
const joi = require('joi');
const id = require('./id.model').idSchema(joi);
const category = require('./category.model').categorySchema(joi);
const group = require('./group.model').groupSchema(joi);
const pack = require('./package.model').packageSchema(joi);
const product = require('./product.model').productSchema(joi);
const retailer = require('./retailer.model').retailerSchema(joi);
const store = require('./store.model').storeSchema(joi);

const schemas = Object.create({
	id: id,
	category: category,
	group: group,
	pack: pack,
	product: product,
	retailer: retailer,
	store: store
});

module.exports = type => {
	return (req, res, next) => {
		let object = null;
		if (req.method == 'GET') { // Bad organization, because of hard code
			object = req.query;
		} else {
			object = req.body;
		}
		// Check valid type first
		if (!object) {
			res.status(status.BAD_REQUEST).send('Object to validate not provided!');
			return;
		}
		if (!type) {
			res.status(status.BAD_REQUEST).send('Schema type to validate not provided!');
			return;
		}

		// Validate the parameter's format
		const {error, value} = joi.validate(object, schemas[type]);

		if (error) {
			res.status(status.BAD_REQUEST).send(`Invalid '${type}' data!\n${error}`);
			return;
		}

		next(); // Move to the next middleware
	}
}
