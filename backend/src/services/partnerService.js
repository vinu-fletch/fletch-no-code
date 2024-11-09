
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
        fields: false,                                        
      }
    });

    if (partner) {
      const config = partner.configs[0] || null; 
      
      // If no screens exist, initialize with a default screen structure
      const screens = partner.screens.length ? partner.screens : [{
        name: "Screen 1",
        backgroundColor: "",
        heading: "",
        continueButtonText: "Continue",
        fields: [],
        isActive: true,
        screen_config: {},
      }];

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
        screens: screens,
        fields: partner.fields,
        categories: partner.categories,
      };
    }

    return null;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve partner data");
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

async function saveScreens (partnerName, configVersion, categoryName, screens)  {
  // Start a transaction
  return await prisma.$transaction(async (prisma) => {
    // Step 1: Retrieve partner and config
    const partner = await prisma.partner.findFirst({
      where: { name: partnerName, is_active: true },
      include: {
        configs: {
          where: { version: parseInt(configVersion, 10) },
        },
        categories: true, // Include categories to verify categoryName
      },
    });

    if (!partner || !partner.configs.length) {
      throw new Error('Partner or configuration version not found');
    }

    const partnerConfig = partner.configs[0];

    // Check if the category exists for the partner
    const category = partner.categories.find(cat => cat.name === categoryName);
    if (!category) {
      throw new Error(`Category '${categoryName}' not found for partner '${partnerName}'`);
    }

    // Step 2: Fetch existing screens for comparison
    const existingScreens = await prisma.screen.findMany({
      where: {
        id: { in: partnerConfig.screen_ids },
        isActive: true,
        category_name: categoryName, // Filter by categoryName
      },
    });

    const existingScreenIds = existingScreens.map((s) => s.id);
    const incomingScreenIds = screens.filter((s) => s.id).map((s) => s.id);

    // Step 3: Determine screens to create, update, and delete
    const screensToCreate = screens.filter((s) => !s.id);
    const screensToUpdate = screens.filter((s) => s.id && existingScreenIds.includes(s.id));
    const screensToDelete = existingScreens.filter((s) => !incomingScreenIds.includes(s.id));

    // Step 4: Process Screens Conditionally

    // Create new screens if any
    let createdScreens = [];
    if (screensToCreate.length > 0) {
      // Prepare data for batch creation
      const createScreensData = screensToCreate.map((screen) => ({
        partner_id: partner.id,
        category_name: categoryName, // Use categoryName from the argument
        screen_config: screen.screen_config || {},
        isActive: true,
      }));

      // Create screens
      await prisma.screen.createMany({
        data: createScreensData,
      });

      // Fetch the newly created screens with their IDs
      const newScreens = await prisma.screen.findMany({
        where: {
          partner_id: partner.id,
          isActive: true,
          category_name: categoryName,
          screen_config: {
            in: screensToCreate.map((s) => s.screen_config),
          },
        },
      });

      createdScreens = newScreens;
    }

    // Update existing screens if any
    if (screensToUpdate.length > 0) {
      const updateScreenPromises = screensToUpdate.map((screen) =>
        prisma.screen.update({
          where: { id: screen.id },
          data: {
            screen_config: screen.screen_config || {},
            isActive: true,
          },
        })
      );

      await Promise.all(updateScreenPromises);
    }

    // Deactivate screens that are not in the incoming list
    if (screensToDelete.length > 0) {
      await prisma.screen.updateMany({
        where: {
          id: { in: screensToDelete.map((s) => s.id) },
        },
        data: { isActive: false },
      });
    }

    // Step 5: Update partner config's screen_ids
    const allScreenIds = [
      ...existingScreens.filter((s) => incomingScreenIds.includes(s.id)).map((s) => s.id),
      ...createdScreens.map((s) => s.id),
    ];

    await prisma.partnerConfig.update({
      where: { id: partnerConfig.id },
      data: { screen_ids: allScreenIds },
    });

    // Step 6: Return the updated list of screens
    const updatedScreensList = await prisma.screen.findMany({
      where: {
        id: { in: allScreenIds },
        isActive: true,
        category_name: categoryName, // Filter by categoryName
      },
    });

    return updatedScreensList;
  });
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
  saveScreens,
  updateScreen,
  deleteScreen,

};