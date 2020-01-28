const setup = require('tests/setup');
const { insertSuperuser, findSuperuser } = require('services/superuser');

// setup();

module.exports = describe('Test Superuser Service', () => {
  test('insertSuperuser should create new superuser', async () => {
    const dataForSuperuser = { name: 'new superuser', password: 'PW for test' };

    const created = await insertSuperuser(dataForSuperuser);

    const superuser = await findSuperuser(created.id);

    expect(superuser).toHaveProperty('name', dataForSuperuser.name);
  });
});
