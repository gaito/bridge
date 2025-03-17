import React, { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

const PatientPrescriptionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      name: 'Medication A',
      status: 'Active',
      refillsLeft: 3,
      lastFilled: '2024-03-01',
      nextRefillDate: '2024-04-01',
      instructions: 'Take one tablet by mouth daily with food.',
      sideEffects: ['Drowsiness', 'Dry mouth', 'Mild nausea'],
      warnings: ['Do not drive until you know how this medication affects you',
                'Avoid alcohol while taking this medication'],
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'CVS Pharmacy - Downtown',
      doctorNotes: 'Patient responding well to treatment. Continue current dosage.',
    },
    // Add more prescriptions...
  ]);

  return (
    <Box p={6}>
      <Heading color="brand.navy" mb={6}>My Prescriptions</Heading>
      
      <InputGroup maxW="600px" mb={8}>
        <InputLeftElement pointerEvents="none">
          🔍
        </InputLeftElement>
        <Input
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderColor="brand.grotto"
          _focus={{ borderColor: 'brand.navy' }}
        />
      </InputGroup>

      <Table variant="simple">
        <Thead bg="brand.babyBlue">
          <Tr>
            <Th color="brand.navy">Medication</Th>
            <Th color="brand.navy">Status</Th>
            <Th color="brand.navy">Refills</Th>
            <Th color="brand.navy">Last Filled</Th>
            <Th color="brand.navy">Pharmacy</Th>
            <Th color="brand.navy">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prescriptions
            .filter(rx => 
              rx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              rx.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
              rx.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(prescription => (
              <Tr 
                key={prescription.id}
                _hover={{ bg: 'brand.white' }}
                cursor="pointer"
              >
                <Td fontWeight="500">{prescription.name}</Td>
                <Td>{prescription.status}</Td>
                <Td>{prescription.refillsLeft}</Td>
                <Td>{prescription.lastFilled}</Td>
                <Td>{prescription.pharmacy}</Td>
                <Td>
                  <Button
                    size="sm"
                    bg="brand.grotto"
                    color="white"
                    _hover={{ bg: 'brand.navy' }}
                    mr={2}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    bg="brand.navy"
                    color="white"
                    _hover={{ bg: 'brand.grotto' }}
                  >
                    Request Refill
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PatientPrescriptionPage;