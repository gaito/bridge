import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme';

const HeaderContainer = styled.header`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${theme.colors.background};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.background};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &.active {
    background-color: ${theme.colors.accent};
  }
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">PrescriptionPro</Logo>
        <NavLinks>
          <NavLink 
            to="/doctor" 
            className={location.pathname.includes('/doctor') ? 'active' : ''}
          >
            Doctors
          </NavLink>
          <NavLink 
            to="/patient" 
            className={location.pathname.includes('/patient') ? 'active' : ''}
          >
            Patients
          </NavLink>
          <NavLink 
            to="/pharmacy" 
            className={location.pathname.includes('/pharmacy') ? 'active' : ''}
          >
            Pharmacy
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;