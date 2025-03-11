const { Server } = require("socket.io");

module.exports = async (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`User is connected`, socket.id);

    socket.on("login", (nickname, cb) => {
      if (nickname.length < 2) {
        cb(false);
        socket.emit("error", "nickname should be minimum 3");
      } else {
        socket.data.nickname = nickname;
        cb(true);
        io.emit("user-joined", { username: nickname });
      }
    });

    socket.on("disconnect", () => {
      io.emit("user-left", { username: socket.data.nickname });
    });

    socket.on("new-message", (messageContent) => {
      if (!socket.data.nickname) {
        return socket.emit("error", "You should need to login first");
      }

      io.emit("chat-message", {
        user: socket.data.nickname,
        message: messageContent,
      });
    });
  });
};
