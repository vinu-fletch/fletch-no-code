import { Box, Flex, VStack, Button, Text, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { usePartnerStore } from "../store";

const Layout = ({ children }) => {
  const router = useRouter();
  const [activeView, setActiveView] = useState(router.pathname);
  const setPartnerData = usePartnerStore((state) => state.setPartnerData);
  const partnerData = usePartnerStore((state) => state.partnerData);

  useEffect(() => {
    setActiveView(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    async function fetchPartnerData() {
      try {
        const response = await fetch("http://localhost:3000/partners/medlife"); // Adjust this endpoint to your API
        const data = await response.json();
        console.log("Partner data:", data);
        setPartnerData(data); // Store data in Zustand
      } catch (error) {
        console.error("Failed to fetch partner data:", error);
      }
    }

    fetchPartnerData();
  }, [setPartnerData]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Top Navigation */}
      <Box bg="background.dark" p={4} color="text.primary" width="100%">
        <Flex justifyContent="space-between" maxWidth="1200px" mx="auto">
          <Text fontWeight="bold">
            {partnerData?.name || "Partner Name"}
          </Text>
          <Text fontSize="sm" color="text.secondary">
            Version: {partnerData?.config?.version || "N/A"}
          </Text>
        </Flex>
      </Box>

      <Flex flex="1">
        {/* Sidebar Navigation */}
        <Box width="250px" bg="background.dark" p={4} color="text.primary">
          <VStack spacing={4} align="stretch">
            <Button
              variant={activeView === "/" ? "outline" : "solid"}
              colorScheme="primary"
              onClick={() => handleNavigation("/")}
            >
              Global Customization
            </Button>
            <Button
              variant={activeView === "/form-builder" ? "outline" : "solid"}
              colorScheme="primary"
              onClick={() => handleNavigation("/form-builder")}
            >
              Data Collection
            </Button>
            <Button
              variant={activeView === "/offers" ? "outline" : "solid"}
              colorScheme="primary"
              onClick={() => handleNavigation("/offers")}
            >
              Offers
            </Button>
            <Button
              variant={activeView === "/payment" ? "outline" : "solid"}
              colorScheme="primary"
              onClick={() => handleNavigation("/payment")}
            >
              Payment
            </Button>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex="1" bg="background.dark" color="text.primary" p={8}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;