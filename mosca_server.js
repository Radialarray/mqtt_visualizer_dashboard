var mosca = require('mosca');

var ascoltatore = {
  type: 'mongo',
  url: 'mongodb://localhost:27017',
  db: 'boats',
  size: 1 * 1024 * 1024 * 1024, // 10 GB
  max: 10000, // documents
  pubsubCollection: 'data',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
//  console.log('Published', packet.payload);
//console.log(packet.payload);
//console.log(bin2string(packet.payload));
drawData();

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}


function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}
