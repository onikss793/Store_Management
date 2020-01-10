const Sequelize = require('sequelize');

class Database {
    constructor(env) {
        this.env = env;

        this.getDatabaseName();
        this.createSequelize();

        return this.sequelize;
    }

    createSequelize() {
        this.sequelize = new Sequelize(
            `mysql://root:1@localhost/${this.name}`,
            { logging: false }
        );
    }

    getDatabaseName() {
        switch (this.env) {
            case 'test': {
                this.name = 'store_management_test';
            }

            case 'dev': {
                this.name = 'store_management_dev';
            }
        }

        this.name = 'store_management';
    }
}

module.exports = Database;
