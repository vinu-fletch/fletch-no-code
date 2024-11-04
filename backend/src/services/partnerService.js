
const prisma = require('../db');

// Service to create a new partner
async function createPartner(data) {
  return await prisma.partner.create({
    data,
  });
}

// Service to get all partners
async function getAllPartners() {
  return await prisma.partner.findMany();
}

// Service to get a partner by ID
async function getPartnerById(id) {
  return await prisma.partner.findUnique({
    where: { id },
  });
}

// Service to update a partner by ID
async function updatePartner(id, data) {
  return await prisma.partner.update({
    where: { id },
    data,
  });
}

// Service to delete a partner by ID
async function deletePartner(id) {
  return await prisma.partner.delete({
    where: { id },
  });
}

module.exports = {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
};