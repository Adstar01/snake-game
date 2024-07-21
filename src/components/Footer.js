import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>Credits: Aditya Das</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #282c34;
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default Footer;
