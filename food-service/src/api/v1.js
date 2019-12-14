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

const PREFIX = '/api/v1';
const PREFIX_CATEGORY = 'food.cat_';
const PREFIX_STORE = 'food.sto_';

const _createPath = path => {
	return `${PREFIX}${path}`;
}

/**
* Main API of service
**/
module.exports = (app, cache, repo, validateModel, validatePermission) => {
	/*
	Inititalize cache
	cache.init(PREFIX_CATEGORY, (err) => {

	});
	cache.init(PREFIX_STORE, (err) => {

	});
	*/

	// Get list stores in cache

	/*
	* Routes that can be accessed only by autheticated users
	*/

	/*
	* Customer APIs
	*/
	// Get nearby stores
	app.get(_createPath('/customer/store/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		// Google Map API to find the nearby stores

	});

	// Get packages of store
	app.get(_createPath('/customer/package/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {

	});	

	/*
	* Group
	*/
	// Get group
	app.get(_createPath('/retailer/group'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.group.getById(id)
		.then(group => {
			const payload = {
				status: 1,
				data: {
					group: group
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

	// Get all groups
	app.get(_createPath('/retailer/group/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create group
	app.post(_createPath('/retailer/group'), validateModel('group'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const group = {
			name: req.body.name,
			description: req.body.description ? req.body.description : 'NA',
			parent: req.body.parent ? req.body.parent : '',
			children: req.body.children ? req.body.children : new Array(),
			retailer: req.body.retailer
		};

		repo.group.create(group)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					group: result
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

	// Update group
	app.put(_createPath('/retailer/group'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete group
	app.delete(_createPath('/retailer/group'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.group.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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

	/**
	* Store
	*/
	// Get store
	app.get(_createPath('/retailer/store'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.store.getById(id)
		.then(store => {
			const payload = {
				status: 1,
				data: {
					store: store
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

	// Get all stores
	app.get(_createPath('/retailer/store/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create store
	app.post(_createPath('/retailer/store'), validateModel('store'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const store = {
			_id: req.body._id,
			name: req.body.name,
			phone: req.body.phone,
			address: req.body.address,
			time: req.body.time,
			coordinate: req.body.coordinate,
			images: req.body.images ? req.body.images : new Array(),
			capture: req.body.capture ? req.body.capture : '',
			enable: true,
			visible: true,
			packages: req.body.packages ? req.body.pakages : new Array(),
			retailer: req.body.retailer
		};

		repo.store.create(store)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					
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

	// Update store
	app.put(_createPath('/retailer/store'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete store
	app.delete(_createPath('/retailer/store'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.store.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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

	/**
	* Product
	*/
	// Get product
	app.get(_createPath('/retailer/product'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.product.getById(id)
		.then(product => {
			const payload = {
				status: 1,
				data: {
					product: product
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

	// Get all products
	app.get(_createPath('/retailer/product/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create product
	app.post(_createPath('/retailer/product'), validateModel('product'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const product = {
			name: req.body.name,
			category: req.body.category,
			group: req.body.group ? req.body.parent : '',
			description: req.body.description ? req.body.description : 'NA',
			note: req.body.note ? req.body.note : '',
			images: req.body.images ? req.body.images : new Array(),
			optional: req.body.optional ? req.body.optional : {},
			retailer: req.body.retailer
		};

		repo.product.create(product)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					product: result
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

	// Update product
	app.put(_createPath('/retailer/product'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete product
	app.delete(_createPath('/retailer/product'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.product.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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

	/**
	* Package
	*/
	// Get package
	app.get(_createPath('/retailer/package'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.pack.getById(id)
		.then(pack => {
			const payload = {
				status: 1,
				data: {
					pack: pack
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

	// Get all packages
	app.get(_createPath('/retailer/package/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create package
	app.post(_createPath('/retailer/package'), validateModel('pack'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const pack = {
			name: req.body.name,
			price: req.body.price,
			description: req.body.description ? req.body.description : 'NA',
			available: true,
			hl: 'en',
			images: req.body.images ? req.body.images : new Array(),
			products: req.body.products,
			retailer: req.body.retailer
		};

		repo.pack.create(pack)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					pack: result
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

	// Update package
	app.put(_createPath('/retailer/package'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete package
	app.delete(_createPath('/retailer/package'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.pack.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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


	/*
	* Routes that can be accessed only by authenticated & authorized users
	*/

	/*
	* Category
	*/
	// Get category
	app.get(_createPath('/admin/category'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.category.getById(id)
		.then(category => {
			const payload = {
				status: 1,
				data: {
					category: category
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

	// Get all categories
	app.get(_createPath('/admin/category/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create category
	app.post(_createPath('/admin/category'), validateModel('category'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const category = {
			_id: req.body._id,
			name: req.body.name ? req.body.name : req.body._id,
			description: req.body.description ? req.body.description : 'NA'
		};

		repo.category.create(category)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					
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

	// Update category
	app.put(_createPath('/admin/category'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete category
	app.delete(_createPath('/admin/category'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.category.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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

	/*
	* Retailer
	*/
	// Get retailer
	app.get(_createPath('/admin/retailer'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.query.id;

		repo.retailer.getById(id)
		.then(retailer => {
			const payload = {
				status: 1,
				data: {
					retailer: retailer
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

	// Get all retailers
	app.get(_createPath('/admin/retailer/gets'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Create retailer
	app.post(_createPath('/admin/retailer'), validateModel('retailer'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const retailer = {
			_id: req.body._id,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			stores: req.body.stores ? req.body.stores : new Array(),
			images: req.body.images ? req.body.images : new Array()
		};

		repo.retailer.create(retailer)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					
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

	// Update retailer
	app.put(_createPath('/admin/retailer'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		res.status(status.OK).send('Comming soon');
	});

	// Delete retailer
	app.delete(_createPath('/admin/retailer'), validateModel('id'), (req, res, next) => {
	// app.get(_createPath('/admin/permissions'), validatePermission('ROLE_READ'), (req, res, next) => {
		const id = req.body.id;

		repo.retailer.deleteById(id)
		.then(result => {
			const payload = {
				status: 1,
				data: {
					id: result
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
