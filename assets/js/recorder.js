import regeneratorRuntime from 'regenerator-runtime';

const recorderBtn = document.getElementById('recorderBtn');
const video = document.getElementById('video');

let stream;
let recorder;
let videoFile;

const handleRecordSave = () => {
  const a = document.createElement('a');
  a.href = videoFile;
  document.body.appendChild(a);
  a.click();
};
const handleRecordStop = () => {
  recorderBtn.innerText = '↳';
  recorderBtn.removeEventListener('click', handleRecordStop);
  recorderBtn.addEventListener('click', handleRecordSave);
  recorder.stop();
};
const handleRecordStart = () => {
  recorderBtn.innerText = '🔴';
  recorderBtn.removeEventListener('click', handleRecordStart);
  recorderBtn.addEventListener('click', handleRecordStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {width: 500, height: 300},
  });
  video.srcObject = stream;
  video.play();
};
init();
recorderBtn.addEventListener('click', handleRecordStart);
