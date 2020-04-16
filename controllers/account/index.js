const bcrypt = require('bcrypt'),
	utils = require('../../utils'),
	dao = require('../../dao'),
	helper = require('./helper');

const login = async (req, res, next) => {
	try {
		if (!utils.checkRequest(req, ['name', 'password'])) {
			next(utils.throwError(400, 'Bad Request'));
		}

		const { name, password } = req.body;
		const store_data = await dao.store.selectStore({ store_name: name })
		                            .then(data => data && data.toJSON());

		if (helper.dataExist(store_data)) {
			await bcrypt.compare(password, store_data.password)
				? res.status(200).json({
					...helper.renderStoreData(store_data),
					token: helper.signJwt(store_data)
				})
				: next(utils.throwError(401, 'Wrong Password'))
		} else {
			next(utils.throwError(401, 'No Match For Store Name'));
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { login };
