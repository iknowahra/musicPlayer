export const onCalcMusic = (time = 0) => {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  return minutes + ':' + seconds;
};
