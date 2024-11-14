

import { useState, useEffect } from "react";
import GlobalCustomization from "../components/GlobalCustomization";
import Layout from "../components/Layout";
import Head from "next/head";

const IndexPage = ({ setCustomTheme, globalSettings, setGlobalSettings }) => {
  
  const fontLink = `https://fonts.googleapis.com/css2?family=${globalSettings.font?.replace(
    " ",
    "+"
  )}&display=swap`;

  return (
    <Layout>
      {/* Dynamic Font */}
      <Head>
        <link rel="stylesheet" href={fontLink} />
        <style>
          {`
            body {
              font-family: '${globalSettings.font || "Arial"}', sans-serif;
            }
          `}
        </style>
      </Head>

      {/* Global Customization Content */}
      <GlobalCustomization
        setCustomTheme={setCustomTheme}
        setGlobalSettings={setGlobalSettings}
        globalSettings={globalSettings}
      />
    </Layout>
  );
};

export default IndexPage;