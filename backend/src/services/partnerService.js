
const prisma = require('../db');

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
        is_active: true,
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


async function saveScreens(partnerId, configurationVersionString, categoryName, screens) {
  const configurationVersion = parseInt(configurationVersionString, 10);

  // Step 1: Validate partner and partnerConfig
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
  });

  if (!partner) {
    throw new Error(`Partner with id ${partnerId} does not exist.`);
  }

  const partnerConfig = await prisma.partnerConfig.findFirst({
    where: {
      partner_id: partnerId,
      version: configurationVersion,
    },
  });

  if (!partnerConfig) {
    throw new Error(
      `PartnerConfig for partner ${partnerId} and version ${configurationVersion} not found.`
    );
  }

  // Step 2: Process screens within a transaction
  return await prisma.$transaction(async (prisma) => {
    const screenIds = []; // List to collect screen IDs in order

    // Fetch existing screen IDs for this partner, category, and configuration version
    const existingScreens = await prisma.screen.findMany({
      where: {
        partner_id: partnerId,
        category_name: categoryName,
        configuration_version: configurationVersion,
      },
      select: { id: true },
    });
    const existingScreenIds = existingScreens.map((screen) => screen.id);

    for (let i = 0; i < screens.length; i++) {
      const screen = screens[i];
      const { id, screen_config } = screen;

      if (id) {
        // Update existing screen
        await prisma.screen.update({
          where: { id },
          data: {
            screen_config: screen_config || {},
            is_active: true,
            configuration_version: configurationVersion,
          },
        });
        screenIds.push(id);
      } else {
        // Create new screen and get its assigned ID
        const createdScreen = await prisma.screen.create({
          data: {
            partner_id: partnerId,
            category_name: categoryName,
            screen_config: screen_config || {},
            is_active: true,
            configuration_version: configurationVersion,
          },
        });
        screenIds.push(createdScreen.id);
      }
    }

    // Delete screens not in the new screenIds (hard delete)
    const screensToDelete = existingScreenIds.filter((id) => !screenIds.includes(id));
    if (screensToDelete.length > 0) {
      await prisma.screen.deleteMany({
        where: {
          id: { in: screensToDelete },
        },
      });
    }

    // Update partnerConfig.screen_ids
    await prisma.partnerConfig.update({
      where: {
        id: partnerConfig.id,
      },
      data: {
        screen_ids: screenIds,
      },
    });

    // Fetch and return the updated list of screens
    const updatedScreensList = await prisma.screen.findMany({
      where: {
        id: { in: screenIds },
      },
      include: { fields: true },
    });

    // Ensure the screens are returned in the correct order
    const orderedScreens = screenIds.map((id) =>
      updatedScreensList.find((screen) => screen.id === id)
    );

    return {
      screens: orderedScreens,
      screen_ids: screenIds,
    };
  });
}

// Delete a screen (soft delete by marking inactive)
async function deleteScreen(screenId) {
  return await prisma.screen.update({
    where: { id: screenId },
    data: { is_active: false },
  });
}

 async function getPartnerConfigurations (partnerName) {
    // Fetch the partner by name to get the partner ID
    const partner = await prisma.partner.findUnique({
      where: { name: partnerName },
      select: { id: true },
    });

    if (!partner) {
      throw new Error(`Partner with name ${partnerName} not found`);
    }

    // Fetch the last 10 configurations, ordered by version descending
    const configurations = await prisma.partnerConfig.findMany({
      where: { partner_id: partner.id },
      orderBy: { version: 'desc' },
      take: 10,
      select: {
        version: true,
        created_at: true,
        // Include any other fields you need
      },
    });

    return configurations;
  }


module.exports = {
  getPartnerByName,
  updateOrCreatePartnerConfig,
  deletePartner,
  updateCategoryStatus,
  getScreens,
  saveScreens,
  deleteScreen,
  getPartnerConfigurations,
};