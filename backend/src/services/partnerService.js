
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

async function getPartnerByName(name, version = null) {
  try {
    const partner = await prisma.partner.findFirst({
    where: { name, is_active: true },
    include: {
      configs: {
        ...(version
          ? { where: { version } }                         // Filter by specific version if provided
          : { orderBy: { version: 'desc' }, take: 1 }),    // Otherwise, retrieve the latest version
      },
      screens: false,                                      
      fields: false                                         
    }
  });

  console.log("Partner", partner)


  if (partner) {
    const config = partner.configs[0] || null; 
    return {
      id: partner.id,
      name: partner.name,
      logo: partner.logo,
      isActive: partner.isActive,
      created_at: partner.created_at,
      updated_at: partner.updated_at,
      config: config ? {
        id: config.id,
        version: config.version,
        globalConfig: config.globalConfig,
        headerConfig: config.headerConfig,
        footerConfig: config.footerConfig,
        layoutConfig: config.layoutConfig,
        screen_ids: config.screen_ids,
        created_at: config.created_at,
        updated_at: config.updated_at
      } : null,
      screens: partner.screens,
      fields: partner.fields
    };
  }

  return null;
  } catch (err) {
    console.error(err)
  }
  
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
  getPartnerByName,
  updatePartner,
  deletePartner,
};