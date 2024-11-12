// screens/Preview.js

import React from 'react';
import { usePartnerStore } from '../../store';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import Header from '@/common-ui/header/header';
import Footer from '@/common-ui/footer/footer';
import ScreensManager from '../../components/screens/ScreensManager';

const Preview = () => {
  const partnerDraft = usePartnerStore((state) => state.partnerDraft);

  // Destructure necessary configurations from partnerDraft
  const {
    config: {
      global_config = {},
      header_config = {},
      footer_config = {},
      layout_config = {},
    } = {},
  } = partnerDraft || {};

  const {
    font_family = 'Arial',
    primary_color = '#333',
    secondary_color = '#555',
    background_color = '#fff',
    text_primary_color = '#000',
    text_secondary_color = '#666',
  } = global_config;

  const {
    footer_text = '<div>Thank you for visiting!</div>',
  } = footer_config;

  const {
    layout_percentage = 60,
    spacing_between_fields = 4,
  } = layout_config;

  return (
    <Layout>
      <Head>
        <style>
          {`
            body {
              font-family: '${font_family || "Arial"}', sans-serif;
            }
          `}
        </style>
      </Head>

      <Box bgColor={background_color} minHeight="100vh" display="flex" flexDirection="column">
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
          fontFamily={font_family}
          color={text_primary_color}
          maxWidth={`${layout_percentage}%`}
          margin="0 auto"
          p={spacing_between_fields * 2}
        >
          <ScreensManager />
        </Box>

        {/* Footer */}
        <Footer footerText={footer_text} color={text_primary_color} />
      </Box>
    </Layout>
  );
};

export default Preview;