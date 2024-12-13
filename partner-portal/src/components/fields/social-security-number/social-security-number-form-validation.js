import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  IconButton,
  Text,
  Button,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import RuleConfig from "../../rules/field-rules-config";
import { List, arrayMove } from "react-movable";

const SocialSecurityNumberValidation = ({
  showModal,
  rules,
  setRules,
  editingRuleIndex,
  handleEditRule,
  handleDeleteRule,
  handleRuleSave,
  handleRuleCancel,
  handleAddRule,
  showRuleConfig,
}) => {
  return (
    <Box>
      <Accordion allowToggle defaultIndex={[0]}>
        {/* Validation Rules */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Validation Rules
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack align="stretch" spacing={3}>
              <List
                values={rules}
                onChange={({ oldIndex, newIndex }) => {
                  const newRules = arrayMove(rules, oldIndex, newIndex);
                  setRules(newRules);
                }}
                renderList={({ children, props }) => (
                  <VStack align="stretch" spacing={3} {...props}>
                    {children}
                  </VStack>
                )}
                renderItem={({ value, props, index }) => (
                  <Box
                    p={2}
                    bg="gray.700"
                    borderRadius="md"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    {...props}
                  >
                    <Text flex="1">
                      {value.type} - {value.trigger}
                    </Text>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => handleEditRule(index)}
                        aria-label="Edit Rule"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => handleDeleteRule(index)}
                        aria-label="Delete Rule"
                      />
                    </HStack>
                  </Box>
                )}
              />

              <Button
                leftIcon={<AddIcon />}
                variant="outline"
                colorScheme="primary"
                onClick={handleAddRule}
                mt={4}
              >
                Add Validation Rule
              </Button>

              {showRuleConfig && (
                <RuleConfig
                  onSave={handleRuleSave}
                  onCancel={handleRuleCancel}
                  initialRule={rules[editingRuleIndex] || null}
                />
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default SocialSecurityNumberValidation;
