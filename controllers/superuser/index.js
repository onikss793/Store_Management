const { insertSuperuser, findSuperuser } = require('services/superuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const { checkRequestBody } = require('./superuser');

const createSuperuser = async (req, res, next) => {
    try {
        const { name = null, password = null } = req.body;

        if (!checkRequestBody(name, password)) throw Error('Bad Request');

        const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

        const superuserData = {
            name,
            password: hashed_password
        };

        const superuser = await insertSuperuser(superuserData);
        const created = await findSuperuser(superuser.id);

        res.status(200).json({ created });
    } catch (err) {
        next(err);
    }
};

module.exports = { createSuperuser };
