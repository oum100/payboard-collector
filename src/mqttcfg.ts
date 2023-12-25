const sourceMqtt = {
    mqttName: "Payboard",
    mqttHost: "mq3.payboard.cc",
    mqttPort: 1883,
    mqttUser: "10000105",
    mqttPass: "mki9lvhjpp1xt4jxgjdjqxuhx2ihucgkgz9ledsylsu7terwtsnibhhjzrnsiiig",
    mqttProtocal: 'mqtt',
    topicToServer: 'payboard/backend/#',   // From client to server
    topicToClient: 'payboard/#',  // From Server to client
    topicPayboard: 'payboard/#'
}

const targetMqtt = {
    mqttName: "Glad Whale",
    mqttHost: "glad-whale.rmq.cloudamqp.com",
    mqttPort: 1883,
    mqttUser: "ilsrjeyw",
    mqttPass: "1riEi7_wHGpUA7r-oF76FF4ay81diLJr",
    mqttProtocal: 'mqtt',
    mqttSubTopic: 'relay/stat/#',
}

// const targetMqtt = {
//     mqttName: "FLIPUP",
//     mqttHost: "flipup.net",
//     mqttPort: 1883,
//     mqttUser: "sammy",
//     mqttPass: "password",
//     mqttProtocal: 'mqtt',
//     mqttTopic: 'relay/stat/#',
// }

export { sourceMqtt, targetMqtt }