const { Brand } = require('../models');

const selectBrands = () => {
	return Brand.findAll();
}

const selectBrand = (index) => {
	return Brand.findOne({ where: { ...index }});
};

const insertBrand = (data) => {
	return Brand.create(data);
}

module.exports = { selectBrand, insertBrand, selectBrands }