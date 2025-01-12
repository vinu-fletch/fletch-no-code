

import {
  Box,
  Flex,
  VStack,
  Button,
  Text,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePartnerStore } from "../store"; 

const Layout = ({ children }) => {
  const router = useRouter();
  const activeView = router.pathname;

  const partnerData = usePartnerStore((state) => state.partnerData);
  const versions = usePartnerStore((state) => state.versions);
  const selectedVersion = usePartnerStore((state) => state.selectedVersion);
  const fetchPartnerData = usePartnerStore((state) => state.fetchPartnerData);
  const fetchVersions = usePartnerStore((state) => state.fetchVersions);
  const setSelectedVersion = usePartnerStore((state) => state.setSelectedVersion);

  useEffect(() => {
    
    fetchVersions("metlife");
    
    fetchPartnerData("metlife");
  }, []); 

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isPreview = activeView === "/preview";


  const handleVersionChange = async (event) => {
    const version = parseInt(event.target.value, 10);
    setSelectedVersion(version);

    
    await fetchPartnerData("metlife", version);
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Top Navigation */}
      <Box bg="background.dark" p={4} color="text.primary" width="100%">
        <Flex alignItems="center" maxWidth="1200px" mx="auto">
          <Text fontWeight="bold">
            {partnerData?.name?.toUpperCase() || "Partner Name"}
          </Text>
          <Spacer />
          <Text fontSize="sm" color="text.secondary" ml={4} mr={2}>
            Version:
          </Text>
          <Select
            value={selectedVersion || ""}
            onChange={handleVersionChange}
            width="150px"
            size="sm"
          >
            {versions?.map(({ version }) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </Select>
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
              variant={activeView === "/data-collection" ? "outline" : "solid"}
              colorScheme="primary"
              onClick={() => handleNavigation("/data-collection")}
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
 
            <Box flex="1" bg="background.light" color="text.primary" p={8}>
              {children}
            </Box>
          
        
      </Flex>
    </Flex>
  );
};

export default Layout;