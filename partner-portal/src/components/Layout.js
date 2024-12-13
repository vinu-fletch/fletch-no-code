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
import { useEffect, useState } from "react";
import { usePartnerStore } from "../store";

const Layout = ({ children }) => {
  const router = useRouter();
  const activeView = router.pathname;

  const partnerData = usePartnerStore((state) => state.partnerData);
  const versions = usePartnerStore((state) => state.versions);
  const selectedVersion = usePartnerStore((state) => state.selectedVersion);
  const fetchPartnerData = usePartnerStore((state) => state.fetchPartnerData);
  const fetchVersions = usePartnerStore((state) => state.fetchVersions);
  const setSelectedVersion = usePartnerStore(
    (state) => state.setSelectedVersion
  );
  const [menuSelected, setMenuSelected] = useState(
    activeView === "/"
      ? "Global Customization"
      : activeView === "/data-collection"
      ? "Data Collection"
      : activeView === "/offers"
      ? "Offers"
      : activeView === "/payment"
      ? "Payment"
      : ""
  );

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

      <Box flex="1">
        {/* Sidebar Navigation */}
        <Box bg="background.dark" p={12} pt={4} pb={4} color="text.primary">
          <Select
            width="250px"
            value={menuSelected}
            onChange={(e) => {
              const value = e.target.value;
              setMenuSelected(value);
              if (value === "Global Customization") {
                handleNavigation("/");
              } else if (value === "Data Collection") {
                handleNavigation("/data-collection");
              } else if (value === "Offers") {
                handleNavigation("/offers");
              } else if (value === "Payment") {
                handleNavigation("/payment");
              }
            }}
          >
            <option value="Global Customization">Global Customization</option>
            <option value="Data Collection">Data Collection</option>
            <option value="Offers">Offers</option>
            <option value="Payment">Payment</option>
          </Select>
        </Box>

        {/* Main Content */}

        <Box flex="1" bg="background.light" color="text.primary" p={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
