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

const ObjectID = require('mongodb').ObjectID;

module.exports = (repo, col) => {

	const create = group => {
		return new Promise((resolve, reject) => {
			col.insertOne(group, (err, r) => {
				if (err)
					return reject(err);
				resolve(r.ops[0]);
			});
		});
	}

	const getById = id => {
		return new Promise((resolve, reject) => {
			col.findOne({_id: ObjectID(id)}, (err, doc) => {
				if (err)
					return reject(err);
				if (!doc)
					return reject(`${id} not available`);
				resolve(doc);
			});
		});
	}

	const update = group => {
		return new Promise((resolve, reject) => {
			resolve('Comming soon');
		});
	}

	const deleteById = id => {
		return new Promise((resolve, reject) => {
			col.deleteOne({_id: ObjectID(id)}, (err, r) => {
				if (err)
					return reject(err);
				resolve(id);
			});
		});
	}

	return Object.create({
		create,
		getById,
		update,
		deleteById
	});
}
