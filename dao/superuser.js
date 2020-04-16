const { Superuser } = require('models');

const insertSuperuser = data => {
	return Superuser.create(data);
};

const findSuperuser = (index, attributes) => {
	return Superuser.findOne(
		{ where: { ...index } },
		{ attributes }
	);
};

const selectSuperuserByName = (name) => {
	return Superuser.findOne({ where: { name } });
}

module.exports = { insertSuperuser, findSuperuser, selectSuperuserByName };
