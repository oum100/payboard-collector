import express from 'express';
import { rootHandler, helloHandler } from './handlers';
// import {connect} from "mqtt"

import { connect } from "mqtt"
import { sourceMqtt, targetMqtt } from "./mqttcfg";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

//*******************************  SourceMqtt Connection ********************************
let clientSource = connect({
    host: sourceMqtt.mqttHost,
    port: sourceMqtt.mqttPort,
    username: sourceMqtt.mqttUser,
    password: sourceMqtt.mqttPass,
    protocol: 'mqtt'
})

clientSource.on('connect', () => {
    console.log('Source MQTT: '+ sourceMqtt.mqttName + '...Connected');
    clientSource.subscribe(sourceMqtt.topicPayboard, (err) => {
        if (err) {
            console.error(err);
        }
    });
});

clientSource.on('message', async(topic, message) => {
    console.log("\n")

    const payload = JSON.parse(message.toString());
    const isBackend = topic.split('/')[1];

    if(isBackend === "backend"){    // For message from client to server only
        console.log("Client publish response.");
        console.log("Topic: ",topic);
        console.log("Message: ",message.toString());
        const uuid = payload.uuid;
        const response = payload.response

        console.log("Uuid: ",uuid)
        console.log("Response: ",response)

        if(response == "paid"){
            const order = payload.orderID
            const trans = await prisma.transactions.update({
                where: {
                    order: order
                },
                data:{
                    jobState: "Accepted"
                }
            })
        }

        if(response == "jobstate"){
            
        }


        if(response == "jobcreate"){
            
        }



    }else{    // For message from server to client only   (payboard backend send payment noti to iot)
        console.log("Server publish request.");
        console.log("Topic: ",topic);
        console.log("Message: ",message.toString());
        const uuid = topic.split('/')[2];
        const action = payload.action;

        console.log("Uuid: ",uuid)
        console.log("Action: ",action)

        if(action === 'paid'){
            const orderNo = payload.orderNo
            const price = payload.price

            const transaction = await prisma.transactions.create({
                data:{
                    order: orderNo as string,
                    deviceUuid: uuid as string,
                    amount: parseInt(price),
                    status: action as string,
                }
            })
        }
    }
    
    
    
    



})

// const app = express();
// const port = process.env.PORT || '3300';

// app.get('/', rootHandler);
// app.get('/hello/:name', helloHandler);

// app.listen(port, () => {
//   return console.log(`Server is listening on ${port}`);
// });

