import React, { useState } from 'react';
import styled from 'styled-components';
import music_on from '../assets/icons/music_on.png';
import music from '../assets/icons/music.png';
import stack_on from '../assets/icons/layers_on.png';
import stack from '../assets/icons/layers.png';
import search_on from '../assets/icons/search_on.png';
import search from '../assets/icons/search.png';

const Wrap = styled.div`
  width: 100%;
  height: 7rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.gray8};
  display: flex;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 2.8rem;
    height: 2.8rem;
    margin-bottom: 0.4rem;
  }
`;

const Tab1 = styled.div``;
const Tab2 = styled.div``;
const Tab3 = styled.div``;

const TabMenu = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.xm};
  color: ${({ theme, on }) => (on ? theme.colors.purple : theme.colors.gray3)};
`;

function Tab({ onTabNav: onPassNav }) {
  const [current, setCurrent] = useState('Main');
  const onTabNav = (nav) => {
    setCurrent(nav);
    onPassNav(nav);
  };
  return (
    <Wrap>
      <Tab1 onClick={() => onTabNav('Main')}>
        <img src={current === 'Main' ? music_on : music} alt="tab menue top5" />
        <TabMenu on={current === 'Main'}>Top 5</TabMenu>
      </Tab1>
      <Tab2 onClick={() => onTabNav('Playlist')}>
        <img
          src={current === 'Playlist' ? stack_on : stack}
          alt="tab menue playlist"
        />
        <TabMenu on={current === 'Playlist'}>Play List</TabMenu>
      </Tab2>
      <Tab3 onClick={() => onTabNav('Search')}>
        <img
          src={current === 'Search' ? search_on : search}
          alt="tab menue search"
        />
        <TabMenu on={current === 'Search'}>Search</TabMenu>
      </Tab3>
    </Wrap>
  );
}

export default Tab;
