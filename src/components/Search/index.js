import React, { useState } from 'react';
import styled from 'styled-components';
import Play from '../PlayView';
import Result from './Result';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

function Search({
  musics,
  onAddPlaylist,
  onRemovePlaylist,
  current,
  onPlay,
  onCurrentMusic,
  setOnPlayView,
  setOnPlay,
}) {
  const handlePlayMusic = (music) => {
    onCurrentMusic(music);
    setOnPlayView(true);
  };

  return (
    <Wrap>
      <Result
        musics={musics}
        handlePlayMusic={handlePlayMusic}
        onAddPlaylist={onAddPlaylist}
        onRemovePlaylist={onRemovePlaylist}
        setOnPlay={setOnPlay}
        onPlay={onPlay}
        current={current}
      />
    </Wrap>
  );
}

export default Search;
