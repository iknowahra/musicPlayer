import React, { useState } from 'react';
import styled from 'styled-components';
import Album from '../Album';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${({ theme }) => theme.colors.purple};
  color: white;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaylistWrap = styled.div``;
const PlaylistUl = styled.ul``;
const PlaylistLi = styled.li`
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem;
  padding: 0 0.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
  }
`;

const PlaySetting = styled.div`
  i {
    font-size: 2rem;
  }
`;
function Playlist({ playlist, onRemovePlaylist }) {
  const [list, setList] = useState(playlist);

  const onRemove = (music) => {
    setList((pre) => pre.filter((v) => v.title !== music.title));
    music.isOnList = false;
    onRemovePlaylist(music);
  };

  return (
    <Wrap>
      <Header>My playlist</Header>
      <PlaylistWrap>
        <PlaylistUl>
          {list.map((music, idx) => (
            <PlaylistLi key={idx}>
              <Album music={music} />
              <PlaySetting onClick={() => onRemove(music)}>
                <i className="xi-minus-thin" />
              </PlaySetting>
            </PlaylistLi>
          ))}
        </PlaylistUl>
      </PlaylistWrap>
    </Wrap>
  );
}

export default Playlist;
