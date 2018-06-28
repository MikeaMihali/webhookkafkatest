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
const record = [
    {
        topic: "events",
        messages: "Hello World",
        attributes: 1 /* Use GZip compression for the payload */
    }
];
producer.send(record,(err,data)=>{
    console.log(data);
});