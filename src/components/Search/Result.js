import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Album from '../Album';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 13%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  > input[type='text'] {
    width: 90%;
    height: 3.5rem;
    border: none;
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.gray7};
    padding: 0 1.5rem;
    font-size: 1.5rem;
  }
  &::after {
    font-family: 'xeicon';
    content: '🔍';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 83%;
    color: ${({ theme }) => theme.colors.gray3};
  }
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
  button {
    margin-left: 0.8rem;

    i {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.gray3};
    }
    .xi-play.active,
    .xi-pause.active {
      color: ${({ theme }) => theme.colors.purple};
      font-weight: 700;
    }
  }
`;

function Search({
  musics,
  handlePlayMusic,
  onAddPlaylist,
  onRemovePlaylist,
  onPlay,
  setOnPlay,
  current,
}) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    const term = e.target.value;
    setValue(term);
  };

  const onAdd = (music) => {
    setList((pre) => {
      return pre.map((v) => {
        if (v.title === music.title) {
          v.isOnList = true;
        }
        return v;
      });
    });
    onAddPlaylist(music);
  };

  const onRemove = (music) => {
    setList((pre) => {
      return pre.map((v) => {
        if (v.title === music.title) {
          v.isOnList = false;
        }
        return v;
      });
    });
    onRemovePlaylist(music);
  };

  useEffect(() => {
    let term = value.toLowerCase();
    if (term.length) {
      let filtered = musics.filter(
        (v) =>
          v.title.toLowerCase().includes(term) ||
          v.artists[0].toLowerCase().includes(term),
      );
      setList(filtered);
    }
  }, [value, musics]);

  return (
    <Wrap>
      <Header>
        <input
          type="text"
          placeholder="검색..."
          value={value}
          onChange={(e) => onChange(e)}
        />
      </Header>
      <PlaylistWrap>
        <PlaylistUl>
          {list?.map((music, idx) => (
            <PlaylistLi key={idx}>
              <Album music={music} />
              <PlaySetting>
                <button
                  onClick={
                    music?.title === current?.title && !!onPlay
                      ? () => setOnPlay(false)
                      : () => handlePlayMusic(music)
                  }
                >
                  <i
                    className={
                      music?.title === current?.title && !!onPlay
                        ? `xi-pause active`
                        : `xi-play ${onPlay ? '' : 'active'}`
                    }
                  />
                </button>
                <button
                  onClick={
                    music.isOnList ? () => onRemove(music) : () => onAdd(music)
                  }
                >
                  <i
                    className={music.isOnList ? 'xi-minus-min' : 'xi-plus-min'}
                  />
                </button>
              </PlaySetting>
            </PlaylistLi>
          ))}
        </PlaylistUl>
      </PlaylistWrap>
    </Wrap>
  );
}

export default Search;
