/**
 * Created by Luca on 09.07.17.
 */
 var {ipcRenderer} = require('electron');
 var hdConstraints = {
         audio: false,
         video: {
           mandatory: {
             chromeMediaSourceId: x,
           }
         }
       };



       ipcRenderer.on('asynchronous-reply', (event, arg) => {
   console.log(arg) // prints "pong"
   hdConstraints.video.mandatory.chromeMediaSourceId=arg;
console.log(hdConstraints);
  tracking();
 })

var x = 0;
var y = 0;
var deg = 0;
var dataMarker;


function tracking() {
var video = ARController.getUserMedia({
    maxARVideoSize: 320, // do AR processing on scaled down video of this size
    facing: "environment",
    onSuccess: function(video) {
        console.log('got video', video);

        $('#webcam').append(video);
        // document.body.appendChild(video);

        var ar = new ARController(video.videoWidth, video.videoHeight, 'camera_para.dat');
        ar.onload = function() {
            var markerId;

            ar.loadMarker('patt.hiro', function(marker) {
                markerId = marker;
            });

            ar.addEventListener('getMarker', function(ev) {
                if (ev.data.marker.idPatt === markerId) {
							// console.log('saw marker', ev.data.marker);
//							console.log('transformation matrix', ar.getTransformationMatrix());
                    dataMarker = ev.data.marker;
                    x = dataMarker.pos[0];
                    y = dataMarker.pos[1];
                    matrix = ar.getTransformationMatrix();
//                            console.log("x  =  " + x + "  |  y  =  " + y);
                    var rad = Math.acos(matrix[0]);
                    deg = Math.degrees(rad);
                    if(matrix[1] <= 0){
                        deg =360-deg;
                    }
                    // document.getElementById("0").innerHTML = x;
                    // document.getElementById("1").innerHTML = y;
                    // document.getElementById("2").innerHTML = deg;

                }
            });



            //console.log('camera matrix', ar.getCameraMatrix());

            setInterval(function() {
                ar.process(video);
            }, 33);
        };
    }

});
}

Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

getPosRot = function () {
    var posRot = [];
    posRot[0] = x;
    posRot[1] = y;
    posRot[2] = deg;
    return posRot;
}

getX = function () {
    return toString(x);
}
