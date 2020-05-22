/*
 * This module serves as a placeholder for Arduino1
 */
let mqtt = require("mqtt");
let client;

module.exports = {
  init: () => {
    console.log("RelayPublisher startup succesful");
  },
  connect: () => {
    console.log("Arduino1: Connecting to broker...");
    client = mqtt.connect("http://localhost:1883", { clientId: "Arduino1" });
    client.on("message", (topic, message) => {
      console.log(`Arduino1: new message on topic ${topic}: ${message}`);
    });
  },
  publish: () => {
    console.log("Arduino1: Publishing INFO...");
    let data = {
      id: 1,
      IP: "192.168.0.91",
      mac: "dead.aaaa.feed",
      type: "Relay",
      data: {
        relay1Status: "ON",
        relay2Status: "ON",
        relay1: "3.5A",
        relay2: "2.5A",
      },
    };
    client.publish("boxes", JSON.stringify(data));
  },
  subscribe: () => {
    console.log("Arduino1: Subscribing to self topic...");
    client.subscribe("boxes/1");
  },
};
