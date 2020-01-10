const setup = require('tests/setup');
const Supertest = require('supertest');
const app = require('app');
const request = Supertest(app);

setup();

describe('Test Superuser Controllers', () => {
    test('createSuperuser should respond created', async () => {
        const dataForSuperuser = {
            name: 'new superuser',
            password: 'PW for test'
        };

        const response = await request
            .post('/superuser')
            .send(dataForSuperuser);

        expect(response.body).toHaveProperty(
            ['created', 'name'],
            dataForSuperuser.name
        );
    });

    test('createSuperuser should throw Error when body"s empty', async () => {
        const dataForSuperuser = {};

        const response = await request
            .post('/superuser')
            .send(dataForSuperuser);

        expect(response.body).toHaveProperty('error', 'Bad Request');
    });
});
