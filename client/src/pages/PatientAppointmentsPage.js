import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Primary Care',
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Check-up',
      location: 'Main Clinic - Room 204',
      status: 'Upcoming',
      notes: 'Annual physical examination'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: '2024-03-20',
      time: '2:30 PM',
      type: 'Follow-up',
      location: 'Heart Center - Suite 105',
      status: 'Upcoming',
      notes: 'Review of recent test results'
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };

  return (
    <Box p={6}>
      <Box mb={8}>
        <Heading color="brand.navy" mb={4}>My Appointments</Heading>
        <Button
          bg="brand.grotto"
          color="white"
          _hover={{ bg: 'brand.navy' }}
          mb={6}
        >
          Schedule New Appointment
        </Button>
      </Box>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {appointments.map(appointment => (
          <Box
            key={appointment.id}
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            bg="white"
            shadow="sm"
            _hover={{ shadow: 'md' }}
          >
            <VStack align="stretch" spacing={3}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Heading size="md" color="brand.navy">{appointment.doctor}</Heading>
                <Badge 
                  colorScheme={appointment.status === 'Upcoming' ? 'green' : 'gray'}
                >
                  {appointment.status}
                </Badge>
              </Box>
              
              <Text color="gray.600" fontSize="sm">{appointment.specialty}</Text>
              
              <Divider />
              
              <Box>
                <Text fontWeight="500">Date & Time</Text>
                <Text>{appointment.date} at {appointment.time}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="500">Location</Text>
                <Text>{appointment.location}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="500">Type</Text>
                <Text>{appointment.type}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="500">Notes</Text>
                <Text fontSize="sm">{appointment.notes}</Text>
              </Box>
              
              <Box display="flex" gap={2} mt={2}>
                <Button
                  size="sm"
                  bg="brand.grotto"
                  color="white"
                  _hover={{ bg: 'brand.navy' }}
                  onClick={() => handleReschedule(appointment)}
                >
                  Reschedule
                </Button>
                <Button
                  size="sm"
                  bg="brand.navy"
                  color="white"
                  _hover={{ bg: 'brand.grotto' }}
                >
                  💬 Message Doctor
                </Button>
              </Box>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Reschedule Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.navy">Reschedule Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add calendar component here */}
            <Text>Calendar scheduling interface will be implemented here</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.grotto"
              color="white"
              _hover={{ bg: 'brand.navy' }}
              mr={3}
            >
              Confirm New Time
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientAppointmentsPage;