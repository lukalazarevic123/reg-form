const { Router } = require('express');

const router = Router();

const registerController = require('../controller/registerController.js');
const dbController = require('../controller/dbController.js');

router.route('/register').post(dbController.registerPerson);
router.route('/get-people').get(dbController.getAll);
router.route('/delete-person/:id').delete(dbController.deletePerson);
router.route('/patch-person/:id').patch(dbController.patchPerson);

module.exports = router;