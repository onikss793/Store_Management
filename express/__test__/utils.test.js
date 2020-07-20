const checkRequest = require('../utils/checkRequest');
const timeout = 60000;

describe('Test Request Body', () => {
	it('false if all empty', () => {
		const request = {};
		request.body = { name: null, password: null };
		expect(checkRequest(request, ['name', 'password'])).toEqual(false);
	}, timeout);

	it('true if all filled', () => {
		const request = {};
		request.body = { name: 'hello', password: '1234' };
		expect(checkRequest(request, ['name', 'password'])).toEqual(true);
	}, timeout);

	it('false if one of them empty', () => {
		const request = {};
		request.body = { name: null, password: '1234' };
		expect(checkRequest(request, ['name', 'password'])).toEqual(false);
		request._body = { name: 'hello', password: null };
		expect(checkRequest(request, ['name', 'password'])).toEqual(false);
	}, timeout);

	it('false if length is 0', () => {
		const request = {};
		request.body = { name: '', password: '' };
		expect(checkRequest(request, ['name', 'password'])).toEqual(false);
	}, timeout);
});
