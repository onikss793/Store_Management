const { Brand } = require('../models');

const selectBrand = (index) => {
	return Brand.findOne({ where: { ...index }});
};

module.exports = { selectBrand }