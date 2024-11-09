// routes/partnerRoutes.js
const express = require('express');
const partnerController = require('../controllers/partnerController');
const router = express.Router();

router.get('/:name', partnerController.getPartnerByName);
router.put("/:name/config", partnerController.updatePartnerConfig);
router.put("/category/:categoryName", partnerController.updateCategoryStatus);
router.put('/:partnerName/config/:configVersion/category/:categoryName/screens', partnerController.saveScreens);

module.exports = router;