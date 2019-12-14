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

const _createPath = path => {
	return `${PREFIX}${path}`;
}

const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyCw-6Nf3_5230D6U5cnSb1HBJQswxTaRG0'
});

const getTheShortestDestination = elements => {
	if (!elements || !elements.length)
		return null;

	let shortest = elements[0];
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].status == 'OK') {
			if (shortest.duration.value > elements[i].duration.value)
				shortest = elements[i];
		}
	}

	return shortest;
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
		// res.status(status.OK).send('よっ!　生きてるよ〜 :)');
		googleMapsClient.distanceMatrix({
			origins: [{lat: 10.768421, lng: 106.684501}, {lat: 10.770808, lng: 106.686792}, {lat: 10.770018, lng: 106.688594}, {lat: 10.768015, lng: 106.688916}, {lat: 10.759703, lng: 106.698490}, {lat: 10.861917, lng: 106.654953}],
			destinations: [{lat: 10.767284, lng: 106.687757}, {lat: 10.768421, lng: 106.684501}],
			mode: 'driving'
		}, (err, response) => {
			if (err) {
				res.status(status.OK).send(err);
				return;
			}

				res.status(status.OK).send(response);

			/*
			if (response.status != 200)
				res.status(status.OK).send(response.status);
			else {
				const origin = response.json.origin_addresses[0];
				const destination = response.json.destination_addresses[0];

				// Get only one row
				const elements = response.json.rows[0].elements;
				const shortest = getTheShortestDestination(elements);

				if (shortest) {
					const payload = {
						origin: origin,
						destination: destination,
						shortest: shortest.duration.text
					};

					res.status(status.OK).send(payload);
				} else {
					res.status(status.OK).send('No route found!');
				}
			}
			*/
		});
	});
	
}
