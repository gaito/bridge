import React, { useState } from 'react';
import {
  Box,
  VStack,
  Grid,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  Divider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const Profile = () => {
  const toast = useToast();
  const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onClose: onPasswordClose } = useDisclosure();
  const { isOpen: isInsuranceOpen, onOpen: onInsuranceOpen, onClose: onInsuranceClose } = useDisclosure();

  // Mock user data - replace with actual data from your backend
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA 12345',
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS123456789',
      groupNumber: 'GRP987654321',
      expirationDate: '2024-12-31'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [newInsurance, setNewInsurance] = useState({
    provider: '',
    policyNumber: '',
    groupNumber: '',
    expirationDate: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(editedUserData);
      toast({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Add password change logic here
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onPasswordClose();
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleInsuranceUpdate = () => {
    setUserData(prev => ({
      ...prev,
      insurance: newInsurance
    }));
    toast({
      title: 'Insurance Updated',
      description: 'Your insurance information has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onInsuranceClose();
    setNewInsurance({
      provider: '',
      policyNumber: '',
      groupNumber: '',
      expirationDate: ''
    });
  };

  return (
    <Box>
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
        <Box bg="white" p={6} borderRadius="lg" shadow="base">
          <Heading size="lg" color="brand.navy" mb={6}>Profile Information</Heading>
          
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel color="brand.navy">Full Name</FormLabel>
              <Input
                value={isEditing ? editedUserData.name : userData.name}
                onChange={(e) => setEditedUserData({...editedUserData, name: e.target.value})}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="brand.navy">Email</FormLabel>
              <Input
                value={isEditing ? editedUserData.email : userData.email}
                onChange={(e) => setEditedUserData({...editedUserData, email: e.target.value})}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="brand.navy">Phone</FormLabel>
              <Input
                value={isEditing ? editedUserData.phone : userData.phone}
                onChange={(e) => setEditedUserData({...editedUserData, phone: e.target.value})}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="brand.navy">Address</FormLabel>
              <Input
                value={isEditing ? editedUserData.address : userData.address}
                onChange={(e) => setEditedUserData({...editedUserData, address: e.target.value})}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <Button
              onClick={handleEditToggle}
              bg={isEditing ? 'brand.grotto' : 'brand.navy'}
              color="white"
              _hover={{ bg: 'brand.navy' }}
              mt={4}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </VStack>
        </Box>

        <VStack spacing={6}>
          <Box bg="white" p={6} borderRadius="lg" shadow="base" w="full">
            <Heading size="md" color="brand.navy" mb={4}>Insurance Information</Heading>
            <VStack spacing={3} align="stretch">
              <Text><strong>Provider:</strong> {userData.insurance.provider}</Text>
              <Text><strong>Policy Number:</strong> {userData.insurance.policyNumber}</Text>
              <Text><strong>Group Number:</strong> {userData.insurance.groupNumber}</Text>
              <Text><strong>Expiration Date:</strong> {userData.insurance.expirationDate}</Text>
              <Button
                onClick={onInsuranceOpen}
                bg="brand.navy"
                color="white"
                _hover={{ bg: 'brand.grotto' }}
                mt={2}
              >
                Update Insurance
              </Button>
            </VStack>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" shadow="base" w="full">
            <Heading size="md" color="brand.navy" mb={4}>Security</Heading>
            <Button
              onClick={onPasswordOpen}
              bg="brand.navy"
              color="white"
              _hover={{ bg: 'brand.grotto' }}
              w="full"
            >
              Change Password
            </Button>
          </Box>
        </VStack>
      </Grid>

      {/* Password Change Modal */}
      <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.grotto"
              color="white"
              _hover={{ bg: 'brand.navy' }}
              mr={3}
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
            <Button variant="ghost" onClick={onPasswordClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Insurance Update Modal */}
      <Modal isOpen={isInsuranceOpen} onClose={onInsuranceClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">Update Insurance Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Insurance Provider</FormLabel>
                <Input
                  value={newInsurance.provider}
                  onChange={(e) => setNewInsurance({...newInsurance, provider: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Policy Number</FormLabel>
                <Input
                  value={newInsurance.policyNumber}
                  onChange={(e) => setNewInsurance({...newInsurance, policyNumber: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Group Number</FormLabel>
                <Input
                  value={newInsurance.groupNumber}
                  onChange={(e) => setNewInsurance({...newInsurance, groupNumber: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Expiration Date</FormLabel>
                <Input
                  type="date"
                  value={newInsurance.expirationDate}
                  onChange={(e) => setNewInsurance({...newInsurance, expirationDate: e.target.value})}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.grotto"
              color="white"
              _hover={{ bg: 'brand.navy' }}
              mr={3}
              onClick={handleInsuranceUpdate}
            >
              Update Insurance
            </Button>
            <Button variant="ghost" onClick={onInsuranceClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;