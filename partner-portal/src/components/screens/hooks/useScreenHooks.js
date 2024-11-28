// useScreenHooks.js

import { useEffect } from 'react';

export const replacePlaceholders = (str, values) => {
    return str.replace(/\{\{(.*?)\}\}/g, (match, key) => {
      const keys = key.trim().split('.');
      return keys.reduce((acc, curr) => acc && acc[curr], values) || '';
    });
  };

  // Helper function to set a value at a nested path in an object
 export const setValueAtPath = (obj, path, value) => {
    const keys = path.split('.');
    let curr = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
  };

const useScreenHooks = (
  screen,
  fieldValues,
  setFieldValues,
  globalVariables,
  setGlobalVariables
) => {
  // Helper function to replace placeholders in strings
  

  // Function to handle API calls and populate values
  const handleApiCallAndPopulate = async (action) => {
    const { config } = action;
    let {
      apiUrl,
      requestMethod,
      requestHeaders,
      requestBody,
      responseDataPath,
      target,
      valueSource,
      staticValue,
    } = config;


    const values = {
      field_values: fieldValues,
      global: globalVariables,
    };

    apiUrl = replacePlaceholders(apiUrl, values);
    if (requestHeaders) {
      requestHeaders = replacePlaceholders(requestHeaders, values);
    }
    if (requestBody) {
      requestBody = replacePlaceholders(requestBody, values);
    }

    // Prepare options
    const options = {
      method: requestMethod || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (requestHeaders) {
      const headers = JSON.parse(requestHeaders);
      options.headers = { ...options.headers, ...headers };
    }

    if (requestMethod === 'POST' || requestMethod === 'PUT') {
      if (requestBody) {
        const body = JSON.parse(requestBody);
        options.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(apiUrl, options);
      const responseData = await response.json();

      let valueToPopulate;
      if (valueSource === 'apiResponse') {
        // Use responseDataPath to extract value
        const dataPathParts = responseDataPath.split('.');
        valueToPopulate = dataPathParts.reduce(
          (acc, part) => acc && acc[part],
          responseData
        );
      } else if (valueSource === 'static') {
        valueToPopulate = staticValue;
      }

      // Populate the target
      if (target.startsWith('{{') && target.endsWith('}}')) {
        const targetPath = target.slice(2, -2).trim(); // Remove {{ and }}
        const targetKeys = targetPath.split('.');
        if (targetKeys[0] === 'field_values') {
            const updatedFields = { ...fieldValues };
            setValueAtPath(updatedFields, targetKeys.slice(1).join('.'), valueToPopulate);
            setFieldValues(updatedFields);
            } else if (targetKeys[0] === 'global') {
            const updatedVariables = { ...globalVariables };
            setValueAtPath(updatedVariables, targetKeys.slice(1).join('.'), valueToPopulate);
            setGlobalVariables(updatedVariables);
        }
      }

      // Log the populated value
      console.log(`Populated ${target} with value:`, valueToPopulate);
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  useEffect(() => {
    const executeOnLoadRules = async () => {
      const rules = screen.screen_config?.rules || [];
      const onLoadRules = rules.filter((rule) => rule.trigger === 'ON_LOAD');

      for (const rule of onLoadRules) {
        if (rule.type === 'API_CALL') {
          for (const action of rule.actions) {
            if (action.type === 'populate') {
              // Perform API call and populate target
              await handleApiCallAndPopulate(action);
            }
          }
        }
      }
    };

    executeOnLoadRules();
  }, [screen]);
  const executeOnSubmitRules = async () => {
    const rules = screen.screen_config?.rules || [];
    const onSubmitRules = rules.filter((rule) => rule.trigger === 'ON_SUBMIT');

    for (const rule of onSubmitRules) {
      if (rule.type === 'API_CALL') {
        for (const action of rule.actions) {
          if (action.type === 'populate') {
            await handleApiCallAndPopulate(action);
          }
        }
      }
    }
  };

  return {
    executeOnSubmitRules,
  };
};

export default useScreenHooks;