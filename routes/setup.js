const setup = require('../utils/prodData');

module.exports = async (req, res, next) => {
	try {
		await setup();

		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};