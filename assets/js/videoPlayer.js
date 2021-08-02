const video = document.querySelector('video');

const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');

const playRange = document.getElementById('playRange');
const volumeRange = document.getElementById('volumeRange');

video.volume = 0.5;

const handlePlayBtn = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? 'play' : 'stop';
};
const handleMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? '🔇' : '🔈';
};

const handlePlayRange = (event) => {
  const {
    target: {value},
  } = event;
};
const hanldeVolumeRange = (event) => {
  const {
    target: {value},
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = '🔇';
  }
  if (Number(value) === 0) {
    muteBtn.innerText = '🔇';
  } else if (Number(value) === 0.5) {
    muteBtn.innerText = '🔈';
  } else if (Number(value) === 1) {
    muteBtn.innerText = '🔊';
  }
  video.volume = value;
};

playBtn.addEventListener('click', handlePlayBtn);
muteBtn.addEventListener('click', handleMuteBtn);

playRange.addEventListener('input', handlePlayRange);
volumeRange.addEventListener('input', hanldeVolumeRange);
