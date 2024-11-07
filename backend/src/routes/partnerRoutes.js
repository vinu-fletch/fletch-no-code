// routes/partnerRoutes.js
const express = require('express');
const partnerController = require('../controllers/partnerController');
const router = express.Router();

router.post('/', partnerController.createPartner);
router.get('/', partnerController.getAllPartners);
router.get('/name/:name', partnerController.getPartnerByName);
router.put('/:id', partnerController.updatePartner);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;