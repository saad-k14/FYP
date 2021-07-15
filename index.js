const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { addMessage } = require("./chat/chats");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const admin = require("./routes/admin");
const users = require("./routes/users");
const categories = require("./routes/categories");
const business = require("./routes/businessDetails");
const requests = require("./routes/requests");
const chats = require("./routes/chats");
const contacts = require("./routes/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// app.use(express.json());
// app.use(express.urlencoded());

app.use("/api/admin", admin);
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/business", business);
app.use("/api/requests", requests);
app.use("/api/chats", chats);
app.use("/api/contacts", contacts);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

mongoose
  .connect(
    "mongodb+srv://dibuzz:Dibuzz123@cluster0.l0bii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

io.on("connect", (socket) => {
  // socket.on("join", ({ sender, receiver }, callback) => {
  //   const room = userId + "_" + businessUserId;
  //   message = "User has joined";
  //   const msg = addMessage({ userId, businessUserId, room, message });

  //   socket.join(room);

  //   socket.emit("message", {
  //     user: { businessUserId },
  //     text: `${userId}, welcome to room ${room}.`,
  //   });
  //   socket.broadcast
  //     .to(room)
  //     .emit("message", { user: { userId }, text: `I have joined!` });

  //   // io.to(room).emit("roomData", {
  //   //   room: room,
  //   //   users: getUsersInRoom(room),
  //   // });

  //   callback();
  // });

  socket.on("join", ({ tempRoom }) => {
    socket.join(tempRoom);
  });
//send message on when button is pressed
  socket.on(
    "sendMessage",
    async ({ sender, receiver, room, message }, callback) => {
      const res = await addMessage({
        sender,
        receiver,
        room,
        message,
      }).then(() => {
        console.log("Done");
        const senderId = sender._id;
        io.to(room).emit("message", { sender: senderId, message: message });
      });

      // socket.emit("message", { user: "admin", text: "Joined Chat" });

      // socket.broadcast
      //   .to(room)
      //   .emit("message", { user: "admin", text: "User has joined" });

      // socket.join(room);
      callback();
    }
  );

  socket.on("sendMessage", (message, callback) => {});

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

const port = 4000;
server.listen(process.env.PORT || port, () =>
  console.log(`Server has started.`)
);
