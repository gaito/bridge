import React from 'react';
import { Box, Button, Input, VStack, Heading } from '@chakra-ui/react';

const Login = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} w="400px" p={8} borderRadius="lg" bg="white" boxShadow="lg">
        <Heading color="brand.navy">Login</Heading>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button w="full" bg="brand.navy" color="white" _hover={{ bg: 'brand.grotto' }}>
          Sign In
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;