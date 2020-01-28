const superuserControllersTest = require('./controllers/superuser');
const superuserServicesTest = require('./services/superuser');
const setup = require('./setup');

setup();

superuserControllersTest;
superuserServicesTest;
