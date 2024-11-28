const partnerService = require('../services/partnerService');



async function getPartnerByName(req, res) {
  try {
    const { name } = req.params;
    const version = req.query.version ? parseInt(req.query.version, 10) : null;

    const partner = await partnerService.getPartnerByName(name, version);
    if (partner) {
      res.status(200).json(partner);
    } else {
      res.status(404).json({ error: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve partner' });
  }
}


async function updatePartnerConfig(req, res) {
  const { id } = req.params; 
  const {partnerId} = req.body;
  const { createNewVersion, config } = req.body;
  const { global_config, header_config, footer_config, layout_config } = config;

  try {
    
    const updates = {};
    if (global_config) updates.global_config = global_config;
    if (header_config) updates.header_config = header_config;
    if (footer_config) updates.footer_config = footer_config;
    if (layout_config) updates.layout_config = layout_config;

    
    const updatedConfig = await partnerService.updateOrCreatePartnerConfig(
      partnerId,
      config.id,
      updates,
      createNewVersion
    );

    
    res.status(createNewVersion ? 201 : 200).json(updatedConfig);
  } catch (error) {
    console.error("Error updating partner configuration:", error);
    res.status(500).json({ error: "Failed to update partner configuration" });
  }
}


async function deletePartner(req, res) {
  try {
    await partnerService.deletePartner(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete partner' });
  }
}

async function updateCategoryStatus(req, res)  {
  const { categoryName } = req.params;
  const { partnerId, isActive } = req.body; 

  try {
    const updatedCategory = await partnerService.updateCategoryStatus(partnerId, categoryName, isActive);
    if (updatedCategory) {
      res.status(200).json({ success: true, category: updatedCategory });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.error("Error updating category status:", error);
    res.status(500).json({ success: false, error: "Failed to update category status" });
  }
};

async function saveScreens (req, res)  {
  const { partnerId, configVersion, categoryName } = req.params;
  const { screens } = req.body;

  try {
    const result = await partnerService.saveScreens(partnerId, configVersion, categoryName, screens);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error saving screens:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


async function deleteScreen(req, res) {
  try {
    await partnerService.deleteScreen(req.params.screenId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete screen' });
  }
}

async function getPartnerConfigurations(req, res) {
    const { name } = req.params;
    try {
      const configurations = await partnerService.getPartnerConfigurations(name);
      res.json(configurations);
    } catch (error) {
      console.error('Error fetching partner configurations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function validatePincode(req, res) {
  const { pincode } = req.body;
  try {
    if (!req.headers['x-api-key'] || req.headers['x-api-key'].length < 5) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const isValid = await partnerService.validatePincode(pincode);
    res.json({ isValid });
  } catch (error) {
    console.error('Error validating pincode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getApiKey(req, res) {
  res.status(200).json({ apiKey: "123456"});
}

module.exports = {
  getPartnerByName,
  updatePartnerConfig,
  deletePartner,
  updateCategoryStatus,
  saveScreens,
  deleteScreen,
  getPartnerConfigurations,
  validatePincode,
  getApiKey
};