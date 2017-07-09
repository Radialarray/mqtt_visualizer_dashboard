// document.getElementById("submitSettings").addEventListener("click", function (e) {
//        var window = remote.getCurrentWindow();
//        window.close();
//   });


var {ipcRenderer, remote} = require('electron');
var main = remote.require("./main.js");



function closeSettings() {
  var window = remote.getCurrentWindow();
  optionSel = $( "#selectWebcam option:selected" ).attr('value');
  // console.log(optionSel);
  ipcRenderer.send('asynchronous-message', optionSel);
  $('body').addClass('onClose')
  setTimeout(function() {
    window.close();
  }, 2000);



}

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })

var getMediaDevices = function() {
  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices);

  function gotDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      // option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'microphone ' + (audioSelect.length + 1);
        // audioSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'camera ' +
          (videoSelect.length + 1);
        $('#selectWebcam').append(option);
        console.log(option);
      } else {
        console.log('Found one other kind of source/device: ', deviceInfo);
      }
    }
  }
}

var createSettings = function() {

  var arr = [];


  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices).then(createElements);

  function gotDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'microphone ' + (audioSelect.length + 1);
        // audioSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'camera ' +
          (videoSelect.length + 1);
        arr.push({
          val: option.value,
          text: option.text
        })
        //  $('#selectWebcam').append($("<option>").attr('value',option.value).text(option.text));
        // console.log(option);
      } else {
        // console.log('Found one other kind of source/device: ', deviceInfo);
      }
    }
  }
  function createElements() {
    $(arr).each(function() {
      $('#selectWebcam').append($("<option>").attr('value', this.val).text(this.text));
    });
    materialSelect();
  }
}

function materialSelect() {
  $('select').material_select();
}

$(document).ready(function() {
  createSettings();
});
