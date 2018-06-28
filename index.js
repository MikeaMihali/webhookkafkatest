const express = require("express");
const bodyParser=require("body-parser");
var  kafka = require("kafka-node");

// const client=new kafka.Client("54.37.81.35:2188","kafka-node-client", {
//     sessionTimeout: 300,
//     spinDelay: 100,
//     retries: 2
// });
const client = new kafka.KafkaClient({kafkaHost: '54.37.81.35:9094'});
const producer =new kafka.HighLevelProducer(client);
producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
});
producer.on("error", function(error) {
    console.error(error);
});
const app= new express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.post("/events/update",function(req,res){
    const buffer = new Buffer.from(JSON.stringify(req.body));
    const record = [
        {
            topic: "events",
            messages: buffer,
            attributes: 1 /* Use GZip compression for the payload */
        }
    ];
    producer.send(record,(err,data)=>{
        console.log(data);
    });
    console.log(req.body);
    res.sendStatus(200);
});
app.listen(process.env.PORT || 3000);