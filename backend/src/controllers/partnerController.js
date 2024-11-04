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

// Controller to get a partner by ID
async function getPartnerById(req, res) {
  try {
    const partner = await partnerService.getPartnerById(req.params.id);
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
async function updatePartner(req, res) {
  try {
    const partner = await partnerService.updatePartner(req.params.id, req.body);
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update partner' });
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
  getPartnerById,
  updatePartner,
  deletePartner,
};