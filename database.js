const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    `mysql://root:1@localhost/${getDbName(process.env.NODE_ENV)}`,
    {
        logging: false
    }
);

function getDbName(env) {
    switch (env) {
        case 'test': {
            this.name = 'store_management_test';
            break;
        }

        case 'dev': {
            this.name = 'store_management_dev';
            break;
        }
        case 'production': {
            this.name = 'store_management';
            break;
        }
    }

    return this.name;
}

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
            { logging: data => console.log(data) }
        );
    }

    getDatabaseName() {
        switch (this.env) {
            case 'test': {
                this.name = 'store_management_test';
                break;
            }

            case 'dev': {
                this.name = 'store_management_dev';
                break;
            }
            case 'production': {
                this.name = 'store_management';
                break;
            }
        }
    }

    getSequelize() {
        return this.sequelize;
    }
}

module.exports = sequelize;
