const router = require('express').Router();

const { createSuperuser } = require('controllers/superuser');

router.post('/', createSuperuser);

module.exports = router;
