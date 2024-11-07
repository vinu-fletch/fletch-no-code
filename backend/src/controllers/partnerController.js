const partnerService = require('../services/partnerService');

// Controller to create a new partner
async function createPartner(req, res) {
  try {
    const partner = await partnerService.createPartner(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create partner' });
  }
}

// Controller to get all partners
async function getAllPartners(req, res) {
  try {
    const partners = await partnerService.getAllPartners();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve partners' });
  }
}

// Controller to get a partner by name
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

// Controller to update a partner by ID
async function updatePartnerConfig(req, res) {
  const { id } = req.params; // The `PartnerConfig` ID for updating
  const partnerId = req.body.partner_id; // Assume partner_id is sent in the request body
  const { createNewVersion, globalConfig, headerConfig, footerConfig, layoutConfig } = req.body;

  try {
    // Collect only provided fields in updates object
    const updates = {};
    if (globalConfig) updates.globalConfig = globalConfig;
    if (headerConfig) updates.headerConfig = headerConfig;
    if (footerConfig) updates.footerConfig = footerConfig;
    if (layoutConfig) updates.layoutConfig = layoutConfig;

    // Call service to handle either update or new version creation
    const updatedConfig = await partnerService.updateOrCreatePartnerConfig(
      partnerId,
      id,
      updates,
      createNewVersion
    );

    // Return 201 status for new version creation, 200 for update
    res.status(createNewVersion ? 201 : 200).json(updatedConfig);
  } catch (error) {
    console.error("Error updating partner configuration:", error);
    res.status(500).json({ error: "Failed to update partner configuration" });
  }
}

// Controller to delete a partner by ID
async function deletePartner(req, res) {
  try {
    await partnerService.deletePartner(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete partner' });
  }
}

module.exports = {
  createPartner,
  getAllPartners,
  getPartnerByName,
  updatePartnerConfig,
  deletePartner,
};