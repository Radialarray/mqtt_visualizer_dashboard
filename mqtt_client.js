var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://172.20.13.221')

client.on('connect', function () {
  client.subscribe('presence')
  client.publish('/data', "message")
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
