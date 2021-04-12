// import React from 'react';
const apiURL = 'https://random-data-api.com/api/address/random_address?size=30';


class API {
	static getData() {
		return fetch(apiURL)
		.then(res => res.json());
	}
}

export default API;