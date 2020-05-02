const { Brand } = require('../models');

const selectBrands = () => {
	return Brand.findAll();
};

const selectBrand = (index) => {
	return Brand.findOne({ where: { ...index } });
};

const insertBrand = (data, transaction) => {
	return Brand.create(data, { transaction });
};

module.exports = { selectBrand, insertBrand, selectBrands };