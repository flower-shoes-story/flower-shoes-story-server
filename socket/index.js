const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");

const Message = require("../models/Message");

const { EVENTS } = require("../constants");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  }
});

io.on("connection", (socket) => {
  let messages = [];
  let targetMessages = null;
  let targetRoomId = "";

  socket.on(EVENTS.JOIN, async (roomId) => {
    targetRoomId = roomId;

    targetMessages = await Message.findOne({ roomId });

    if (targetMessages) {
      messages.push(...targetMessages.messages);
    } else {
      targetMessages = await Message.create({
        couple: mongoose.Types.ObjectId(targetRoomId),
        messages,
      });
    }

    socket.join(roomId);

    socket.emit(EVENTS.GET_MESSAGE, messages);
  });

  socket.on(EVENTS.SEND_MESSAGE, ({ user, message, time }) => {
    const chat = {
      user,
      message,
      time,
    };

    messages.push(chat);

    io.to(targetRoomId).emit(EVENTS.SEND_MESSAGE, chat);
  });

  socket.on(EVENTS.DISCONNECT, async () => {
    await Message.findOneAndUpdate(
      { couple: mongoose.Types.ObjectId(targetRoomId) },
      { $set: { messages } }
    );
  });
});

module.exports = io;
