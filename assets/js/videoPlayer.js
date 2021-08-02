const videoContainer = document.getElementById('videoContainer');
const videoController = document.getElementById('videoController');
const video = document.getElementById('video');

const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const screenBtn = document.getElementById('fullScreen');

const playRange = document.getElementById('playRange');
const volumeRange = document.getElementById('volumeRange');

const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');

video.value = 0.5;

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
  volumeRange.value = video.muted ? 0 : 0.7;
};

const handleScreenBtn = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
  screenBtn.innerText = fullScreen ? '⎚' : '⎙';
};

const hanldeVolumeRange = (event) => {
  const {
    target: {value},
  } = event;
  if (video.muted) {
    video.muted = false;
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
const formatTime = (sec) => {
  return new Date(sec * 1000).toISOString().substr(11, 8);
};

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  playRange.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  playRange.value = Math.floor(video.currentTime);
};

const handlePlayRange = (event) => {
  const {
    target: {value},
  } = event;
  video.currentTime = value;
};
let controlTimeout = null;
const handleMouseMove = () => {
  if (controlTimeout) {
    clearTimeout(controlTimeout);
    controlTimeout = null;
  }
  videoController.classList.add('--showing');
};

const handleMouseLeave = () => {
  controlTimeout = setTimeout(() => {
    videoController.classList.remove('--showing');
  }, 3000);
};
const handleEnded = () => {
  const {id} = videoContainer.dataset;
  console.log(id, 'id');
  fetch(`/api/video/${id}/view`, {
    method: 'POST',
  });
};

playBtn.addEventListener('click', handlePlayBtn);
muteBtn.addEventListener('click', handleMuteBtn);
screenBtn.addEventListener('click', handleScreenBtn);

playRange.addEventListener('input', handlePlayRange);
volumeRange.addEventListener('input', hanldeVolumeRange);

video.addEventListener('loadedmetadata', handleLoadedMetaData);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
video.addEventListener('ended', handleEnded);
