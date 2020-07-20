const axios = require('axios');
const { createDatabase } = require('../database');
const { StoreService, AccountService } = require('../../services');
const database = createDatabase();
const storeService = new StoreService(database);


async function forceDatabase() {
	await database.force();
}

async function getMasterAccessToken() {
	const accountService = new AccountService(database);
	const { storeId } = await accountService.login({
		store_name: 'master',
		password: 'password'
	});

	return accountService.getAccessToken(storeId);
}

async function setMasterStore() {
	const transaction = await database.transaction();
	const master = {
		store_name: 'master',
		password: 'password',
		brand_id: 1,
		is_admin: true
	};

	await storeService.createStore(master, transaction);
	await transaction.commit();
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
		headers: { Authorization: accessToken }
	});
}

module.exports = {
	database,
	makeRandomName,
	axiosCall,
	setMasterStore,
	forceDatabase,
	getMasterAccessToken
};
