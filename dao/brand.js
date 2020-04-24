const { Brand } = require('../models');

const selectBrand = (index) => {
	return Brand.findOne({ where: { ...index }});
};

const insertBrand = (data) => {
	return Brand.create(data);
}

module.exports = { selectBrand, insertBrand }