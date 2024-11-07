
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
        globalConfig: config.global_config,
        headerConfig: config.header_config,
        footerConfig: config.footer_config,
        layoutConfig: config.layout_config,
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
  



// Fetch the latest configuration version for a partner
async function getLatestPartnerConfig(partnerId) {
  return await prisma.partnerConfig.findFirst({
    where: { partner_id: partnerId },
    orderBy: { version: "desc" },
  });
}

// Update an existing configuration by config ID, supporting partial updates
async function updateExistingConfig(configId, updates) {
  // Fetch the existing config to retain fields that are not being updated
  const existingConfig = await prisma.partnerConfig.findUnique({
    where: { id: configId },
  });

  if (!existingConfig) throw new Error("Configuration not found");

  return await prisma.partnerConfig.update({
    where: { id: configId },
    data: {
      globalConfig: updates.globalConfig ?? existingConfig.globalConfig,
      headerConfig: updates.headerConfig ?? existingConfig.headerConfig,
      footerConfig: updates.footerConfig ?? existingConfig.footerConfig,
      layoutConfig: updates.layoutConfig ?? existingConfig.layoutConfig,
      updated_at: new Date(),
    },
  });
}

// Create a new configuration version by duplicating the latest configuration and applying updates
async function createNewConfigVersion(partnerId, latestConfig, updates) {
  const newVersion = latestConfig.version + 1;
  return await prisma.partnerConfig.create({
    data: {
      partner_id: partnerId,
      version: newVersion,
      globalConfig: updates.globalConfig || latestConfig.globalConfig,
      headerConfig: updates.headerConfig || latestConfig.headerConfig,
      footerConfig: updates.footerConfig || latestConfig.footerConfig,
      layoutConfig: updates.layoutConfig || latestConfig.layoutConfig,
      screen_ids: latestConfig.screen_ids,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

// Main function to handle update or version creation
async function updateOrCreatePartnerConfig(partnerId, configId, updates, createNewVersion) {
  if (createNewVersion) {
    const latestConfig = await getLatestPartnerConfig(partnerId);
    if (!latestConfig) throw new Error("No existing configuration found for this partner");

    return await createNewConfigVersion(partnerId, latestConfig, updates);
  } else {
    return await updateExistingConfig(configId, updates);
  }
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
  updateOrCreatePartnerConfig,
  deletePartner,
};