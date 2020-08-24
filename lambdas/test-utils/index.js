const dotenv = require('dotenv');
const axios = require('axios');
const { createDatabase } = require('../database');
const { AccountService } = require('../../services');
const database = createDatabase();
dotenv.config();

async function getMasterAccessToken() {
	const accountService = new AccountService(database);
	const { store } = getSampleData();
	const { storeId } = await accountService.login({
		store_name: store.store_name,
		password: store.password
	});

	return accountService.getAccessToken(storeId);
}

function makeRandomName(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let result = '';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

async function axiosCall({
	url = 'http://127.0.0.1:8080',
	endpoint = '',
	method = 'GET',
	data,
	accessToken = ''
}) {
	const urlEndpoint = url + endpoint;

	return axios({
		url: urlEndpoint,
		method,
		data,
		headers: { authorization: accessToken }
	}).catch(e => e);
}

const getSampleData = () => {
	return {
		employee: {
			id: 1,
			employee_name: '조인호',
			phone_number: '010-1234-1234'
		},
		store: {
			id: 1,
			store_name: 'master',
			is_admin: true,
			brand_id: 1,
			password: 'password'
		},
		brand: {
			id: 1,
			brand_name: '삼성'
		}
	};
};

module.exports = {
	database,
	makeRandomName,
	axiosCall,
	getSampleData,
	getMasterAccessToken,
};
