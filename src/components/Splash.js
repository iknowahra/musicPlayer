import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/intro-logo.png';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 15rem;
  }
  position: relative;
`;

function Splash() {
  return (
    <Wrap>
      <img src={Logo} alt="logo" />
    </Wrap>
  );
}

export default Splash;
