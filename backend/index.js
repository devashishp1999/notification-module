const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on(
    "sendNotification",
    ({ senderName, receiverName, type, message }) => {
      const receiver = getUser(receiverName);
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
        message,
      });
    }
  );
  socket.on("message", ({ senderName, receiverName, type, message }) => {
    // console.log(receiverName)
    receiverName.forEach((item) => {
      const receiver = getUser(item);
      io.to(receiver.socketId).emit("getMessages", {
        senderName,
        type,
        message,
      });
    });
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});
