import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/intro-logo.png';
import Album from '../Album';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 25%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.purple};
  .img-logo {
    width: 9rem;
    position: absolute;
    top: 3rem;
    left: 2rem;
  }
  .img-cover {
    width: 100%;
    height: 100%;

    img {
      width: inherit;
      height: inherit;
      object-position: 0px -30px;
      object-fit: cover;
      opacity: 0.15;
    }
  }
`;
const MusicBody = styled.div`
  padding: 1rem 2rem;
`;
const MusicUL = styled.ul``;
const MusList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
`;
const MusicItem = styled.div`
  display: flex;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-right: 1rem;
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

function Top5({
  musics,
  handlePlayMusic,
  onAddPlaylist,
  onRemovePlaylist,
  onPlay,
  setOnPlay,
  current,
}) {
  const [list, setList] = useState([...musics]);

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
    setList(musics);
  }, [musics]);

  return (
    <Wrap>
      <Header>
        <div className="img-cover">
          <img src={musics[3]?.cover} alt="first cover" />
        </div>
        <img className="img-logo" src={logo} alt="logo" />
      </Header>
      <MusicBody>
        <MusicUL>
          {list?.map((music, idx) => {
            return (
              <MusList key={idx}>
                <MusicItem>
                  <span>{idx + 1}</span>
                  <Album music={music} />
                </MusicItem>
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
                      music.isOnList
                        ? () => onRemove(music)
                        : () => onAdd(music)
                    }
                  >
                    {music.isOnList ? (
                      <i className="xi-minus-min" />
                    ) : (
                      <i className="xi-plus-min" />
                    )}
                  </button>
                </PlaySetting>
              </MusList>
            );
          })}
        </MusicUL>
      </MusicBody>
    </Wrap>
  );
}

export default Top5;
