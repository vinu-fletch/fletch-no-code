

import React from 'react';
import { usePartnerStore } from '../../store';
import Head from 'next/head';
import { Box, ChakraProvider, extendTheme, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import Header from '@/common-ui/header/header';
import Footer from '@/common-ui/footer/footer';
import ScreensManager from '../../components/screens/ScreensManager';

export const Preview = ({ isOpen, onClose }) => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);

  
  const {
    config: {
      global_config = {},
      header_config = {},
      footer_config = {},
      layout_config = {},
    } = {},
  } = partnerDraft || {};

  const theme = extendTheme({
    colors: {
      primary: global_config.primary_color || "#333",
      secondary: global_config.secondary_color || "#555",
      background: {
        primary: global_config.primary_background_color || "#fff",
        secondary: global_config.secondary_background_color || "#f5f5f5",
        field: global_config.field_background_color || "#f5f5f5",
        modal: global_config.modal_background_color || "#ffffff",
      },
      text: {
        primary: global_config.text_primary_color || "#000",
        secondary: global_config.text_secondary_color || "#666",
        placeholder: global_config.text_placeholder_color || "#888",
        error: global_config.text_error_color || "#ff0000",
        success: "#5cb85c",
      },
      button: {
        primary: global_config.button_primary_color || "#007bff",
        secondary: global_config.button_secondary_color || "#6c757d",
      },
      fieldBorder: global_config.field_border_color || "#ced4da",
    },
    spacing: {
      padding: {
        field: layout_config.padding_inside_fields === "small" ? "8px" :
               layout_config.padding_inside_fields === "large" ? "16px" : "12px",
        section: "16px",
        button: layout_config.button_padding || "medium"
      },
      margin: {
        field: layout_config.margin_between_fields === "small" ? "4px" :
               layout_config.margin_between_fields === "large" ? "12px" : "8px",
        button: layout_config.button_padding === "small" ? "8px" :
               layout_config.button_padding === "large" ? "16px" : "12px",
      },
    },
    fonts: {
      body: global_config.font_family || "Arial, sans-serif",
    },
  });

  console.log("Custom Theme:", theme);

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
              <Head>
                <style>
                  {`
                    body {
                      font-family: '${global_config.font_family || "Arial"}', sans-serif;
                    }
                  `}
                </style>
              </Head>

              <Box
                bgColor={theme.colors.background.primary}
                minHeight="100vh"
                display="flex"
                flexDirection="column"
              >
                {/* Header */}
                <Header
                  logoLink={header_config.logo_link}
                  logoWidth={header_config.logo_width}
                  logoHeight={header_config.logo_height}
                  logoAlignment={header_config.logo_alignment}
                />

                {/* Main Content */}
                <Box
                  flex="1"
                  fontFamily={theme.fonts.body}
                  color={theme.colors.text.primary}
                  maxWidth={`${layout_config.layout_percentage || 60}%`}
                  margin="0 auto"
                  p={theme.spacing.padding.section}
                >
                  <ScreensManager />
                </Box>

                {/* Footer */}
                <Footer footerText={footer_config.footer_text || "<div>Thank you for visiting!</div>"} color={theme.colors.text.primary} />
              </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};
