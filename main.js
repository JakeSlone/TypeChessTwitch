require("dotenv").config();
const tmi = require("tmi.js");
const client = new tmi.Client({
  options: { dbug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_PASSWORD,
  },
  channels: ["TypeChess"],
});
client.connect();

const robot = require("robotjs");
const regex = /[a-h][1-8]/;
let isMod, isSub;

client.on("message", (channel, tags, message, self) => {
  if (tags.mod === true) {
    isMod = true;
  }
  if (tags.subscriber === true) {
    isSub = true;
  }
  if (isMod && message === "resign") {
    robot.keyTap("enter");
  }
  if (message.length === 4 && regex.test(message)) {
    message = message.toLowerCase();
    robot.typeString(message);
    console.log("ran msg");
  } else {
    console.log("failed msg");
  }
});
