const { Superuser } = require('models');

const insertSuperuser = data => {
  const newSuperuser = Superuser.create(data);

  return newSuperuser;
};

const findSuperuser = (id, attributes = ['id', 'name']) => {
  const superuser = Superuser.findByPk(id, { attributes: attributes });

  return superuser;
};

module.exports = { insertSuperuser, findSuperuser };
