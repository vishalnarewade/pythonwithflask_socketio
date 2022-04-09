var myShakeEvent = new Shake({
  threshold: 15
});
index = 1;
var details = {};
var socket = io('');
socket.emit('connection', 'user');
let stream;

let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let image = document.querySelector("#image");
let submitButton = document.querySelector("#submit");
let recaptureButton = document.querySelector("#recapture");
let messagesButton = document.querySelector("#messages");
window.addEventListener('shake', shakeEventDidOccur, false);

function nextSection() {
  $('.card:nth-child('+index+')').css('display', 'block');
  $('.card:nth-child('+(index - 1) +')').css('display', 'none');
  
  index++;
}
nextSection();

document.querySelector("#start-camera").addEventListener('click', async function() {
  stream = await navigator.mediaDevices.getUserMedia({ video: {
    width: 200,
    height: 200
  }, audio: false });
  video.srcObject = stream;
  nextSection();
});

document.querySelector("#click-photo").addEventListener('click', function() {
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  image.value = canvas.toDataURL('image/png');
  nextSection();
});

recaptureButton.addEventListener('click', function() {
  window.location.reload();
})

messagesButton.addEventListener('click', function() {
  stream.getTracks().forEach(function(track) {
    track.stop();
  });
  nextSection();
})

submitButton.addEventListener('click', function() {
  nextSection();
  myShakeEvent.start();
})

function shakeEventDidOccur () {
  let details = {
    name: $('#name').val(),
    message: $('#message').val(),
    time: new Date().getTime().toString(),
    photo: image.value    
  };

  socket.emit('send', details);
  // $('#send').click();
}