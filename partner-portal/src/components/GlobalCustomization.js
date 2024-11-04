// components/GlobalCustomization.js
import {
  Box,
  Button,
  Input,
  Select,
  Textarea,
  Switch,
  FormControl,
  FormLabel,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";

const GlobalCustomization = ({
  setCustomTheme,
  setGlobalSettings,
  globalSettings,
}) => {
  const [logo, setLogo] = useState(globalSettings.logo || null);
  const [logoURL, setLogoURL] = useState(globalSettings.logoURL || null);
  const [font, setFont] = useState(globalSettings.font || "Arial");
  const [disclaimer, setDisclaimer] = useState(globalSettings.disclaimer || "");
  const [backgroundColor, setBackgroundColor] = useState(
    globalSettings.backgroundColor || "#ffffff"
  );
  const [progressBar, setProgressBar] = useState(
    globalSettings.progressBar || false
  );
  const [progressBarDisplayStyle, setProgressBarDisplayStyle] = useState(
    globalSettings.progressBarDisplayStyle || "percentage"
  );
  const [successMessage, setSuccessMessage] = useState(
    globalSettings.successMessage || ""
  );
  const [layoutWidth, setLayoutWidth] = useState(
    globalSettings.layoutWidth || 100
  );

  useEffect(() => {
    // Update the theme with the new background color and font
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        background: {
          ...prevTheme.colors.background,
          light: backgroundColor,
        },
      },
      fonts: {
        ...prevTheme.fonts,
        body: font,
        heading: font,
      },
    }));

    // Store global settings
    setGlobalSettings({
      logo,
      logoURL,
      font,
      disclaimer,
      backgroundColor,
      progressBar,
      progressBarDisplayStyle,
      successMessage,
      layoutWidth,
    });
  }, [
    logo,
    logoURL,
    font,
    disclaimer,
    backgroundColor,
    progressBar,
    progressBarDisplayStyle,
    successMessage,
    layoutWidth,
    setCustomTheme,
    setGlobalSettings,
  ]);

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box p={8} bg="background.light" minHeight="100vh">
      <Heading mb={6}>Global Customization</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Logo</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {logoURL && (
            <Box mt={2}>
              <img
                src={logoURL}
                alt="Logo Preview"
                style={{ height: "40px" }}
              />
            </Box>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Font (Google Font)</FormLabel>
          <Select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            {/* Add more fonts as needed */}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Disclaimer (Header or Footer)</FormLabel>
          <Textarea
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            placeholder="Enter disclaimer text"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Background Color</FormLabel>
          <ChromePicker
            color={backgroundColor}
            onChangeComplete={handleBackgroundColorChange}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="progress-bar" mb="0">
            Show Progress Bar
          </FormLabel>
          <Switch
            id="progress-bar"
            isChecked={progressBar}
            onChange={(e) => setProgressBar(e.target.checked)}
          />
        </FormControl>

        {progressBar && (
          <FormControl>
            <FormLabel>Progress Bar Display Style</FormLabel>
            <Select
              value={progressBarDisplayStyle}
              onChange={(e) => setProgressBarDisplayStyle(e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="screenNumber">Screen Number</option>
            </Select>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Success Message</FormLabel>
          <Textarea
            value={successMessage}
            onChange={(e) => setSuccessMessage(e.target.value)}
            placeholder="Enter success message"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Layout Width (%)</FormLabel>
          <Input
            type="number"
            value={layoutWidth}
            onChange={(e) => setLayoutWidth(e.target.value)}
            min={50}
            max={100}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default GlobalCustomization;