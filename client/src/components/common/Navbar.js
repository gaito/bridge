import React from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Avatar,
  Container,
  HStack,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import BridgeLogo from '../../assets/bridge.svg';


const Navbar = () => {
  const userName = "John Doe"; // Replace with actual user data

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      position="fixed"
      w="100%"
      zIndex={1000}
      boxShadow="sm"
      h="60px"
    >
      <Container maxW="container.xl" h="100%">
        <Flex h="100%" alignItems="center" justifyContent="space-between">
          <RouterLink to="/">
            <HStack spacing={2}>
              <Image
                  src={BridgeLogo}
                  alt="Bridge Logo"
                  h="40px"
                  w="auto"
                />
              <Text fontSize="lg" fontWeight="bold" color="brand.navy">
                Bridge Healthcare Portal
              </Text>
            </HStack>
          </RouterLink>

          <Flex alignItems="center" gap={2}>
            <Text fontSize="sm">{userName}</Text>
            <Menu>
              <MenuButton
                p={0}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              >
                <Avatar
                  size="xs"
                  name={userName}
                  src="https://bit.ly/broken-link"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem as={RouterLink} to="/settings">Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;