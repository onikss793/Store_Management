const router = require('express').Router(),
	storeController = require('../controllers/store');

router.get('/', storeController.storeList);
router.post('/', storeController.createStore);

module.exports = router;