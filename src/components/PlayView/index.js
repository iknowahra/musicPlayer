import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onCalcMusic } from '../../utils/calcMusicTime';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 30px;
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: white;
  transform: ${({ onPlayView }) =>
    onPlayView ? 'translateX(0)' : 'translateX(-3000px)'};
  transition: transform 2s ease-in-out;
`;

const Nav = styled.div`
  width: 100%;
  height: 8%;
  padding: 2%;
  button {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i {
    font-size: 2.7rem;
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
const Album = styled.div`
  width: 100%;
  height: 62%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 27rem;
    height: 27rem;
    border-radius: 1.5rem;
  }
  img + span {
    font-weight: 500;
    line-height: 21px;
    margin: 4rem 0 0.5rem 0;
  }
  span ~ span {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
const PlayZone = styled.div`
  width: 100%;
  height: 33%;
  background-color: white;
`;

const PlayButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  padding: 3rem;

  .btn-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-play {
      margin: 0 2rem;
      i {
        font-size: 6.5rem;
        color: ${({ theme }) => theme.colors.purple};
      }
    }
  }

  i {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.gray7};

    &:hover {
      color: ${({ theme }) => theme.colors.gray3};
    }
  }
  .xi-shuffle.active,
  .xi-redo.active {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const PlayScrollZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;

  input[type='range'] {
    width: 85%;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 0.5rem;
    outline: none;
    background-color: ${({ theme }) => theme.colors.gray7};
    border: none;
    transition: all 450ms ease-in-out;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    background: ${({ theme }) => theme.colors.purple};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .progress-time {
    display: flex;
    width: 85%;
    height: 40%;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: ${({ theme }) => theme.fonts.size.sm};
      color: ${({ theme }) => theme.colors.gray6};
      opacity: 0.7;
    }
    span:first-child {
      color: ${({ theme }) => theme.colors.purple};
    }
  }
`;

function PlayView({
  audio,
  music,
  onPlay,
  setOnPlay,
  onPlayView,
  setOnPlayView,
}) {
  const [onRandom, setRandom] = useState(false);
  const [onRepeat, setRepeat] = useState(false);
  const [rangeValue, setRange] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const onChangeProgress = (e) => {
    const rangeValue = e.target.value;
    audio.currentTime = (rangeValue / 1000) * audio.duration;
    setRange(rangeValue);
  };

  const toggleList = (command) => {
    command === 'random' ? setRandom((pre) => !pre) : setRepeat((pre) => !pre);
  };

  const onForward = () => {
    if (audio.currentTime + 10 > audio.duration) {
      audio.currentTime = audio.duration;
    } else {
      audio.currentTime += 10;
    }
  };

  const onBackward = () => {
    if (audio.currentTime - 10 < 0) {
      audio.currentTime = 0;
    } else {
      audio.currentTime -= 10;
    }
  };

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      const audDuration = onCalcMusic(audio.duration);
      const audCurrent = onCalcMusic(audio.currentTime);
      setDuration(audDuration);
      setCurrentTime(audCurrent);
      setRange((audio.currentTime / audio.duration) * 1000);
    });
  }, [audio]);

  return (
    <Wrap onPlayView={onPlayView}>
      <Nav>
        <button onClick={() => setOnPlayView(false)}>
          <i className="xi-arrow-left" />
        </button>
      </Nav>
      <Album>
        <img src={music.cover} alt="on play album cover" />
        <span>{music.title}</span>
        <span>{music.artists}</span>
      </Album>
      <PlayZone>
        <PlayButtons>
          <span className="btn-icons random">
            <button onClick={() => toggleList('random')}>
              <i className={`xi-shuffle ${onRandom ? 'active' : ''}`} />
            </button>
          </span>
          <span className="btn-icons">
            <button onClick={onBackward}>
              <i className="xi-backward" />
            </button>
            <button
              className="btn-play"
              onClick={() => (onPlay ? setOnPlay(false) : setOnPlay(true))}
            >
              <i className={`xi-${onPlay ? 'pause' : 'play'}`} />
            </button>
            <button onClick={onForward}>
              <i className="xi-forward" />
            </button>
          </span>
          <span className="btn-icons redo">
            <button onClick={() => toggleList('repeat')}>
              <i
                className={`xi-redo xi-flip-horizontal ${
                  onRepeat ? 'active' : ''
                }`}
              />
            </button>
          </span>
        </PlayButtons>
        <PlayScrollZone>
          <input
            type="range"
            min="0"
            max="1000"
            value={rangeValue}
            onChange={(e) => {
              onChangeProgress(e);
            }}
          />
          <div className="progress-time">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </PlayScrollZone>
      </PlayZone>
    </Wrap>
  );
}

export default PlayView;
