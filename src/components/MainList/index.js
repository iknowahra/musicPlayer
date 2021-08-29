import React from 'react';
import styled from 'styled-components';
import Top5 from './Top5';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

function Main({
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
      <Top5
        setOnPlay={setOnPlay}
        musics={musics}
        onPlay={onPlay}
        current={current}
        handlePlayMusic={handlePlayMusic}
        onAddPlaylist={onAddPlaylist}
        onRemovePlaylist={onRemovePlaylist}
      />
    </Wrap>
  );
}

export default Main;
