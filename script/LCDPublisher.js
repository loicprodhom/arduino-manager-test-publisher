/*
 * This module serves as a placeholder for Arduino2
 */
let mqtt = require("mqtt");
let client;

module.exports = {
  init: () => {
    console.log("LCDPublisher startup succesful");
  },
  connect: () => {
    console.log("Arduino2: Connecting to broker...");
    client = mqtt.connect("http://localhost:1883", { clientId: "Arduino2" });
    client.on("message", (topic, message) => {
      console.log(`Arduino2: new message on topic ${topic}: ${message}`);
    });
  },
  publish: () => {
    console.log("Arduino2: Publishing INFO...");
    let data = {
      id: 2,
      IP: "192.168.0.92",
      mac: "dead.bbbb.feed",
      type: "LCD",
      data: ["", "Classroom 305", "Ongoing Exam", ""],
    };
    client.publish("boxes", JSON.stringify(data));
  },
  subscribe: () => {
    console.log("Arduino2: Subscribing to self topic...");
    client.subscribe("boxes/2");
  },
};
