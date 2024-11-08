// routes/partnerRoutes.js
const express = require('express');
const partnerController = require('../controllers/partnerController');
const router = express.Router();

router.get('/:name', partnerController.getPartnerByName);
router.put("/:name/config", partnerController.updatePartnerConfig);
router.put("/category/:categoryName", partnerController.updateCategoryStatus);
router.post('/:name/config/:configVersion/screen', partnerController.createScreen);



module.exports = router;