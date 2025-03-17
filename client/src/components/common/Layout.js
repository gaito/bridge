import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box pt="60px">
        <Sidebar />
        <Box ml="240px" p={6}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;