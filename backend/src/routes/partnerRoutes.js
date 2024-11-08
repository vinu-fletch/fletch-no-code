// routes/partnerRoutes.js
const express = require('express');
const partnerController = require('../controllers/partnerController');
const router = express.Router();

router.post('/', partnerController.createPartner);
router.get('/:name', partnerController.getPartnerByName);
router.put("/:name/config", partnerController.updatePartnerConfig);
router.put("/category/:categoryName", partnerController.updateCategoryStatus);


module.exports = router;