import React from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SidebarLink = ({ to, children }) => (
  <Box
    as={RouterLink}
    to={to}
    p={3}
    borderRadius="md"
    _hover={{ bg: 'gray.100', color: 'brand.grotto' }}
    color="brand.navy"
    fontWeight="500"
  >
    {children}
  </Box>
);

const Sidebar = () => {
  return (
    <Box
      w="240px"
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      h="calc(100vh - 60px)"
      position="fixed"
      left={0}
      top="60px"
      py={6}
    >
      <VStack spacing={2} align="stretch" px={4}>
        <SidebarLink to="/">Dashboard</SidebarLink>
        <SidebarLink to="/prescriptions">Prescriptions</SidebarLink>
        <SidebarLink to="/appointments">Appointments</SidebarLink>
        <SidebarLink to="/profile">Profile</SidebarLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;