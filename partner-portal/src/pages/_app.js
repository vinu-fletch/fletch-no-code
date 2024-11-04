// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [customTheme, setCustomTheme] = useState(theme);
  const [globalSettings, setGlobalSettings] = useState({});

  return (
    <ChakraProvider theme={customTheme}>
      <Component
        {...pageProps}
        setCustomTheme={setCustomTheme}
        globalSettings={globalSettings}
        setGlobalSettings={setGlobalSettings}
      />
    </ChakraProvider>
  );
}

export default MyApp;