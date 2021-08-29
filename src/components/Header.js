import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrap = styled.div`
  width: 100vw;
  height: 2.5rem;
  position: fixed;
  padding: 0 5px;
  top: 0;
  left: 0;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  background-color: ${({ theme }) => theme.colors.gray7};
  color: ${({ theme }) => theme.colors.gray3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const Signal = styled.div`
  i ~ span {
    margin: 0 2px;
  }
`;
const Time = styled.div``;
const Battery = styled.div`
  span ~ i {
    margin: 0 2px;
  }
`;

function Header() {
  const getTime = () => {
    let today = new Date();
    let time = moment(today).format('h:mm A');
    return time;
  };

  return (
    <Wrap>
      <Signal>
        <i className="xi-signal-4" />
        <span>JAR</span>
        <i className="xi-wifi" />
      </Signal>
      <Time>{getTime()}</Time>
      <Battery>
        <span>100%</span>
        <i className="xi-battery" />
      </Battery>
    </Wrap>
  );
}

export default Header;
