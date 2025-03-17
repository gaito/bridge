import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientView from './pages/PatientView';
import PatientPrescriptionPage from './pages/PatientPrescriptionPage';
import PatientAppointmentsPage from './pages/PatientAppointmentsPage';
import Profile from './pages/Profile';
import theme from './theme';
import Layout from './components/common/Layout';  // Changed this import

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<PatientView />} />
            <Route path="/prescriptions" element={<PatientPrescriptionPage />} />
            <Route path="/appointments" element={<PatientAppointmentsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;