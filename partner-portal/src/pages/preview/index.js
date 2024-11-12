import React from 'react';
import { usePartnerStore } from '../../store';
import Head from 'next/head';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '@/components/Layout';

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
    form_completion_heading = 'Thank You!',
    form_completion_paragraph = 'Your form has been submitted successfully.',
  } = global_config;

  const {
    logo_link = '',
    logo_width = '100',
    logo_height = '50',
    logo_alignment = 'center',
  } = header_config;

  const {
    footer_text = '<div>Thank you for visiting!</div>',
  } = footer_config;

  const {
    layout_percentage = 60,
    spacing_between_fields = 4,
  } = layout_config;

  // Convert footer HTML string to React component
  const renderFooter = () => {
    return <div dangerouslySetInnerHTML={{ __html: footer_text }} />;
  };

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
    <Box
      fontFamily={font_family}
      bg={background_color}
      color={text_primary_color}
      width={`${layout_percentage}%`}
      margin="0 auto"
      p={spacing_between_fields * 2}
    >
      {/* Header */}
      <Flex
        as="header"
        justifyContent={logo_alignment}
        alignItems="center"
        p={4}
        borderBottom="1px solid"
        borderColor={secondary_color}
      >
        {logo_link && (
          <Image
            src={logo_link}
            alt="Logo"
            width={`${logo_width}px`}
            height={`${logo_height}px`}
            objectFit="contain"
          />
        )}
      </Flex>

      {/* Main Content */}
      <Box as="main" py={spacing_between_fields * 2}>
        <Text fontSize="xl" color={text_secondary_color} mb={spacing_between_fields}>
          This is the main content area. Adjust this section as needed.
        </Text>
        <Text fontSize="lg" color={primary_color}>
          Sample content goes here. Customize it according to your preferences.
        </Text>
      </Box>

      {/* Footer */}
      <Box as="footer" mt={spacing_between_fields * 4} p={4} borderTop="1px solid" borderColor={secondary_color}>
        {renderFooter()}
      </Box>
    </Box>
    </Layout>
  );
};

export default Preview;