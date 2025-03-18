import React, { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  Button,
  Input,
  Heading,
  Text,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const PatientView = () => {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 1, 
      name: 'Medication A', 
      status: 'Active', 
      refillsLeft: 3, 
      lastFilled: '2024-03-01',
      instructions: 'Take one tablet by mouth daily with food.',
      sideEffects: ['Drowsiness', 'Dry mouth', 'Mild nausea'],
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'CVS Pharmacy - Downtown',
    },
    { 
      id: 2, 
      name: 'Medication B', 
      status: 'Expired', 
      refillsLeft: 0, 
      lastFilled: '2024-02-15',
      instructions: 'Take two tablets by mouth twice daily.',
      sideEffects: ['Headache', 'Dizziness', 'Upset stomach'],
      doctor: 'Dr. Michael Chen',
      pharmacy: 'Walgreens - West Side',
    },
  ]);

  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const {
    isOpen: isPharmacyModalOpen,
    onOpen: onPharmacyModalOpen,
    onClose: onPharmacyModalClose
  } = useDisclosure();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRefillModalOpen,
    onOpen: onRefillModalOpen,
    onClose: onRefillModalClose
  } = useDisclosure();
  const toast = useToast();

  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription);
    onOpen();
  };

  const handlePharmacyChange = (prescriptionId, newPharmacy) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === prescriptionId 
        ? { ...prescription, pharmacy: newPharmacy }
        : prescription
    ));
    toast({
      title: "Pharmacy Updated",
      description: "Your preferred pharmacy has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onPharmacyModalClose();
  };

  const handleRefillRequest = (prescription) => {
    setSelectedPrescription(prescription);
    if (prescription.refillsLeft > 0) {
      toast({
        title: "Refill Requested",
        description: `Your refill request for ${prescription.name} has been submitted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      onRefillModalOpen();
    }
  };

  const handleContactDoctor = () => {
    toast({
      title: "Message Sent",
      description: "Your doctor will be notified about your refill request.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    onRefillModalClose();
  };

  return (
    <Box>
      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
        {/* Quick Actions */}
        <VStack spacing={4}>
          <Box bg="white" p={6} borderRadius="lg" shadow="base" w="full">
            <Heading size="md" mb={4}>Quick Actions</Heading>
            <VStack spacing={3}>
              <Button 
                bg="brand.navy"
                color="white"
                _hover={{ bg: 'brand.grotto' }}
                w="full"
              >
                Schedule Appointment
              </Button>
              <Button 
                bg="brand.navy"
                color="white"
                _hover={{ bg: 'brand.grotto' }}
                w="full"
              >
                Message Provider
              </Button>
              <Button 
                bg="brand.navy"
                color="white"
                _hover={{ bg: 'brand.grotto' }}
                w="full"
              >
                Find Care Near Me
              </Button>
            </VStack>
          </Box>

          {/* Health Resources */}
          <Box bg="white" p={6} borderRadius="lg" shadow="base" w="full">
            <Heading size="md" mb={4}>Health Resources</Heading>
            <VStack spacing={3} align="stretch">
              <Text 
                color="brand.navy" 
                cursor="pointer" 
                _hover={{ color: 'brand.grotto' }}
              >
                📋 Medication Guidelines
              </Text>
              <Text 
                color="brand.navy" 
                cursor="pointer" 
                _hover={{ color: 'brand.grotto' }}
              >
                🏥 Find a Pharmacy
              </Text>
              <Text 
                color="brand.navy" 
                cursor="pointer" 
                _hover={{ color: 'brand.grotto' }}
              >
                ❤️ Wellness Tips
              </Text>
            </VStack>
          </Box>
        </VStack>

        {/* Prescriptions List */}
        <Box bg="white" p={6} borderRadius="lg" shadow="base">
          <Box mb={4} display="flex" justifyContent="space-between">
            <Heading size="md">My Prescriptions</Heading>
            <Input
              placeholder="Search prescriptions..."
              maxW="200px"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor="brand.grotto"
              _focus={{ borderColor: 'brand.navy' }}
            />
          </Box>

          <VStack spacing={4} align="stretch">
            {prescriptions
              .filter(rx => rx.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(prescription => (
  
                <Box
                key={prescription.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="brand.babyBlue"
                _hover={{ bg: 'brand.babyBlue', borderColor: 'brand.grotto' }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text 
                    fontWeight="medium" 
                    cursor="pointer" 
                    onClick={() => handlePrescriptionClick(prescription)}
                    color="brand.navy"
                  >
                    {prescription.name}
                  </Text>
                  <Badge
                    bg={prescription.status === 'Active' ? 'brand.blueGreen' : 'red.100'}
                    color={prescription.status === 'Active' ? 'brand.navy' : 'red.700'}
                  >
                    {prescription.status}
                  </Badge>
                </Box>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Refills remaining: {prescription.refillsLeft}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Last filled: {prescription.lastFilled}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Pharmacy: {prescription.pharmacy}
                </Text>
                <Box mt={3} display="flex" gap={2}>
                  <Button
                    size="sm"
                    bg={prescription.refillsLeft > 0 ? "brand.grotto" : "gray.300"}
                    color="white"
                    _hover={{
                      bg: prescription.refillsLeft > 0 ? "brand.navy" : "gray.400"
                    }}
                    onClick={() => handleRefillRequest(prescription)}
                  >
                    Request Refill
                  </Button>
                  <Button
                    size="sm"
                    bg="brand.navy"
                    color="white"
                    _hover={{ bg: 'brand.grotto' }}
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      onPharmacyModalOpen();
                    }}
                  >
                    Change Pharmacy
                  </Button>
                </Box>
              </Box>
              ))}
          </VStack>
        </Box>
      </Grid>

      {/* Prescription Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">{selectedPrescription?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedPrescription && (
              <VStack align="stretch" spacing={4}>
                <Box borderBottom="1px" borderColor="gray.200" pb={3}>
                  <Heading size="sm" color="brand.navy" mb={2}>Prescription Details</Heading>
                  <Text><strong>Status:</strong> {selectedPrescription.status}</Text>
                  <Text><strong>Refills Left:</strong> {selectedPrescription.refillsLeft}</Text>
                  <Text><strong>Last Filled:</strong> {selectedPrescription.lastFilled}</Text>
                </Box>

                <Box borderBottom="1px" borderColor="gray.200" pb={3}>
                  <Heading size="sm" color="brand.navy" mb={2}>How to Take</Heading>
                  <Text>{selectedPrescription.instructions}</Text>
                  <Text color="red.500" mt={2}>
                    <strong>Important:</strong> Do not skip doses or stop taking without consulting your doctor.
                  </Text>
                </Box>

                <Box borderBottom="1px" borderColor="gray.200" pb={3}>
                  <Heading size="sm" color="brand.navy" mb={2}>Common Side Effects</Heading>
                  <UnorderedList>
                    {selectedPrescription.sideEffects.map((effect, index) => (
                      <ListItem key={index}>{effect}</ListItem>
                    ))}
                  </UnorderedList>
                  <Text color="brand.grotto" mt={2} fontSize="sm">
                    Contact your doctor if side effects persist or worsen
                  </Text>
                </Box>

                <Box>
                  <Heading size="sm" color="brand.navy" mb={2}>Prescribing Doctor</Heading>
                  <Text>{selectedPrescription.doctor}</Text>
                  <Button
                    size="sm"
                    mt={2}
                    bg="brand.grotto"
                    color="white"
                    _hover={{ bg: 'brand.navy' }}
                  >
                    💬 Message Doctor
                  </Button>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* No Refills Modal */}
      <Modal isOpen={isRefillModalOpen} onClose={onRefillModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">No Refills Remaining</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You have no refills remaining for {selectedPrescription?.name}. Would you like to contact your doctor for a new prescription?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.grotto"
              color="white"
              _hover={{ bg: 'brand.navy' }}
              mr={3}
              onClick={handleContactDoctor}
            >
              Contact Doctor
            </Button>
            <Button 
              variant="ghost" 
              onClick={onRefillModalClose}
              color="brand.navy"
              _hover={{ bg: 'brand.babyBlue' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isPharmacyModalOpen} onClose={onPharmacyModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">Select Pharmacy</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>Current Pharmacy: {selectedPrescription?.pharmacy}</Text>
            <VStack spacing={3} align="stretch">
              {[
                'CVS Pharmacy - Downtown',
                'Walgreens - West Side',
                'Rite Aid - East Side',
                'Target Pharmacy - North Mall',
                'Walmart Pharmacy - South Center'
              ].map((pharmacy) => (
                <Button
                  key={pharmacy}
                  variant={selectedPrescription?.pharmacy === pharmacy ? "solid" : "outline"}
                  bg={selectedPrescription?.pharmacy === pharmacy ? "brand.grotto" : "white"}
                  color={selectedPrescription?.pharmacy === pharmacy ? "white" : "brand.navy"}
                  borderColor="brand.grotto"
                  _hover={{ bg: 'brand.navy', color: 'white' }}
                  onClick={() => handlePharmacyChange(selectedPrescription?.id, pharmacy)}
                >
                  {pharmacy}
                </Button>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              onClick={onPharmacyModalClose}
              color="brand.navy"
              _hover={{ bg: 'brand.babyBlue' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientView;