import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
//import axios from 'axios';
import db from './assets/db.json';
import {
  Header,
  Splash,
  MainList,
  Playlist,
  Search,
  Tab,
  PlayView,
} from './components';

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const hideSplashScreen = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const SplashWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  animation: ${hideSplashScreen} 1s ease-in-out forwards;
  animation-delay: 1.5s;
  z-index: 11;
`;

function App() {
  const [page, setPage] = useState('Main');
  const [audio, setAudio] = useState();
  const [onPlay, setOnPlay] = useState(false);
  const [onPlayView, setOnPlayView] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState({});

  const onCurrentMusic = (music) => {
    setCurrent(music);
    audio?.pause();
    setAudio(new Audio(music.source));
    setTimeout(() => setOnPlay(true), 1000);
  };

  const onTabNav = (nav) => {
    setPage(nav);
  };

  const onAddPlaylist = (music) => {
    setPlaylist((pre) => {
      let isOn = !!pre.find((v) => v.title === music.title);
      return isOn ? pre : [...pre, music];
    });
  };

  const onRemovePlaylist = (music) => {
    setPlaylist((pre) => pre.filter((v) => v.title !== music.title));
  };

  const getMusics = async () => {
    const { musics } = db;
    musics.sort((a, b) => -a.vote + b.vote);
    musics.map((v) => {
      const imgModule = require(`./assets/${v.cover}`);
      const AudModule = require(`./assets/${v.source}`);
      v.cover = imgModule.default;
      v.source = AudModule.default;
      v.isOnList = false;
      return v;
    });
    setList(musics);
  };

  useEffect(() => {
    getMusics();
  }, []);

  useEffect(() => {
    onPlay ? audio?.play() : audio?.pause();
  }, [onPlay, audio]);

  useEffect(() => {
    audio?.addEventListener('ended', () => setOnPlay(false));
    return () => {
      audio?.removeEventListener('ended', () => setOnPlay(false));
    };
  }, [audio]);

  return (
    <Wrap>
      <Header />
      <SplashWrap>
        <Splash />
      </SplashWrap>
      {page === 'Main' && (
        <MainList
          musics={list}
          onAddPlaylist={onAddPlaylist}
          onRemovePlaylist={onRemovePlaylist}
          onCurrentMusic={onCurrentMusic}
          setOnPlay={setOnPlay}
          current={current}
          onPlay={onPlay}
          setOnPlayView={(boolean) => setOnPlayView(boolean)}
        />
      )}
      {page === 'Playlist' && (
        <Playlist playlist={playlist} onRemovePlaylist={onRemovePlaylist} />
      )}
      {page === 'Search' && (
        <Search
          musics={list}
          playlist={playlist}
          onAddPlaylist={onAddPlaylist}
          onRemovePlaylist={onRemovePlaylist}
          current={current}
          setOnPlay={setOnPlay}
          onPlay={onPlay}
          onCurrentMusic={onCurrentMusic}
          setOnPlayView={(boolean) => setOnPlayView(boolean)}
        />
      )}
      {onPlayView && (
        <PlayView
          audio={audio}
          music={current}
          onPlayView={onPlayView}
          onPlay={onPlay}
          setOnPlay={setOnPlay}
          setOnPlayView={(boolean) => setOnPlayView(boolean)}
        />
      )}
      <Tab onTabNav={onTabNav} />
    </Wrap>
  );
}

export default App;
