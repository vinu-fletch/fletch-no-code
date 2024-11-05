// components/Layout.js

import { Box, Flex, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const [activeView, setActiveView] = useState(router.pathname);

  useEffect(() => {
    setActiveView(router.pathname);
  }, [router.pathname]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Flex minHeight="100vh">
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
            Form Builder
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="background.light" color="text.primary">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;