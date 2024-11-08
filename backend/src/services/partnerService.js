
const prisma = require('../db');
const { toCamelCase, toUnderscoreCase } = require('../utils/caseConversion');


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
      categories: true,
      screens: true,                                      
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
      createdAt: partner.created_at,
      updatedAt: partner.updated_at,
      config: config ? {
        id: config.id,
        version: config.version,
        global_config: config.global_config,
        header_config: config.header_config,
        footer_config: config.footer_config,
        layout_config: config.layout_config,
        screen_ids: config.screen_ids,
        created_at: config.created_at,
        updated_at: config.updated_at
      } : null,
      screens: partner.screens,
      fields: partner.fields,
      categories: partner.categories
    };
  }

  return null;
  } catch (err) {
    console.error(err)
  }
  
}

async function updateCategoryStatus(partnerId, categoryName, isActive)  {
  try {
    return await prisma.category.updateMany({
      where: {
        partner_id: partnerId,
        name: categoryName,
      },
      data: {
        is_active: isActive,
      },
    });
  } catch (error) {
    console.error("Error updating category status:", error);
    throw error;
  }
};
  
// Main function to handle update or version creation
async function updateOrCreatePartnerConfig(partnerId, configId, updates, createNewVersion) {
  const underscoreUpdates = (updates); // Convert updates to underscore_case for DB
  console.log("Config id", configId)

  if (createNewVersion) {
    const latestConfig = await prisma.partnerConfig.findFirst({
      where: { partner_id: partnerId },
      orderBy: { version: 'desc' },
    });

    if (!latestConfig) throw new Error("No existing configuration found for this partner");

    return await prisma.partnerConfig.create({
      data: {
        partner_id: partnerId,
        version: latestConfig.version + 1,
        global_config: underscoreUpdates.global_config || latestConfig.global_config,
        header_config: underscoreUpdates.header_config || latestConfig.header_config,
        footer_config: underscoreUpdates.footer_config || latestConfig.footer_config,
        layout_config: underscoreUpdates.layout_config || latestConfig.layout_config,
        screen_ids: latestConfig.screen_ids,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  } else {
    const existingConfig = await prisma.partnerConfig.findUnique({
      where: { id: configId },
    });

    if (!existingConfig) throw new Error("Configuration not found");

    return await prisma.partnerConfig.update({
      where: { id: configId },
      data: {
        global_config: underscoreUpdates.global_config ?? existingConfig.global_config,
        header_config: underscoreUpdates.header_config ?? existingConfig.header_config,
        footer_config: underscoreUpdates.footer_config ?? existingConfig.footer_config,
        layout_config: underscoreUpdates.layout_config ?? existingConfig.layout_config,
        updated_at: new Date(),
      },
    });
  }
}


// Service to delete a partner by ID
async function deletePartner(id) {
  return await prisma.partner.delete({
    where: { id },
  });
}

async function getScreens(partnerId) {
  return await prisma.screen.findMany({
    where: { partner_id: partnerId, is_active: true },
    include: { fields: true },
  });
}

async function createScreen(partnerName, configVersion, screen_config) {
  // Step 1: Check if partner and config version exist
  const partner = await prisma.partner.findFirst({
    where: { name: partnerName, is_active: true },
    include: {
      configs: {
        where: { version: parseInt(configVersion, 10) },
      },
    },
  });

  if (!partner || !partner.configs.length) {
    throw new Error('Partner or configuration version not found');
  }

  const partnerConfig = partner.configs[0];

  // Step 2: Create the new screen
  const newScreen = await prisma.screen.create({
    data: {
      partner_id: partner.id,
      category_name: "Data Collection",
      screen_config: screen_config || {},
      field_ids: [],
      is_active: true,
    },
  });

  // Step 3: Update the partner config with the new screen ID
  const updatedScreenIds = [...(partnerConfig.screen_ids || []), newScreen.id];
  await prisma.partnerConfig.update({
    where: { id: partnerConfig.id },
    data: { screen_ids: updatedScreenIds },
  });

  return newScreen;
}

// Update an existing screen
async function updateScreen(screenId, updatedData) {
  return await prisma.screen.update({
    where: { id: screenId },
    data: {
      screen_config: updatedData.screen_config,
      field_ids: updatedData.field_ids,
      updated_at: new Date(),
    },
  });
}

// Delete a screen (soft delete by marking inactive)
async function deleteScreen(screenId) {
  return await prisma.screen.update({
    where: { id: screenId },
    data: { is_active: false },
  });
}

module.exports = {
  createPartner,
  getAllPartners,
  getPartnerByName,
  updateOrCreatePartnerConfig,
  deletePartner,
  updateCategoryStatus,
  getScreens,
  createScreen,
  updateScreen,
  deleteScreen,

};