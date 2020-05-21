/*
 * This module serves as a placeholder for Arduino1
 */
let mqtt = require("mqtt");
let client;

module.exports = {
  init: () => {
    console.log("Publisher startup succesful");
  },
  connect: () => {
    console.log("Connecting to broker...");
    client = mqtt.connect("http://localhost:1883", { clientId: "Arduino1" });
    client.on("message", (topic, message) => {
      console.log(`Arduino1: new message on topic ${topic}: ${message}`);
    });
  },
  publish: () => {
    console.log("Publishing INFO...");
    client.publish(
      "boxes",
      `{"id":"1","IP":"192.168.0.91","mac":"dead.aaaa.feed","type":"relay","relay1":"ON","relay2":"ON"}`
    );
  },
  subscribe: () => {
    console.log("Subscribing to self topic...");
    client.subscribe("boxes/1");
  },
};
