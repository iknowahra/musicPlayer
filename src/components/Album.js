import React from 'react';
import styled from 'styled-components';

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-right: 1rem;
  }
  > img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 0.5rem;
    margin-right: 1.5rem;
  }
  .mus-info {
    display: flex;
    flex-direction: column;
    span:not(:last-child) {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    span:last-child {
      font-size: ${({ theme }) => theme.fonts.size.sm};
      color: ${({ theme }) => theme.colors.gray3};
    }
  }
`;

function Album({ music }) {
  return (
    <PlaylistItem>
      <img src={music.cover} alt="playlist album cover" />
      <div className="mus-info">
        <span>{music.title}</span>
        <span>{music.artists.join(', ')}</span>
      </div>
    </PlaylistItem>
  );
}

export default Album;
