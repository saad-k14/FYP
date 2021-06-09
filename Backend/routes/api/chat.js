const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const nodemailer = require("nodemailer");
const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

var path = require("path");

var post = require("./routes/posts");
const MongoClient = require("mongodb").MongoClient;
let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",

  auth: {
    user: "saadkhan1405@gmail.com",
    pass: "Mongodbwithnodejs1405",
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

var roomsarray = [];
var queearray = [];
var usernamearray = [];

var names = {}; // map socket.id => name
var allUsers = {}; // map socket.id => socket

function findpatner(socket) {
  //// console.log("Name is "+username +"Socket is "+socketid)

  if (queearray.length == 0) {
    queearray.push(socket);
    //// usernamearray.push(username)
    console.log("data is pushed");
    console.log(names);
    console.log("connected users:" + queearray.length);
  } else {
    console.log("data after pop");
    var peer = queearray.pop();
    var peerusername = usernamearray.pop();

    ////console.log("peer id is:" +peerid+ "peer username:" +peerusername)
    // var roomname=peer.id+"#"+peerusername+"."+username+"#"+socket.id;

    var roomname = socket.id + "#" + peer.id;

    console.log(roomname);
    socket.join(roomname);
    peer.join(roomname);

    roomsarray[peer.id] = roomname;
    roomsarray[socket.id] = roomname;

    console.log(names);

    peer.emit("chat start", { name: names[socket.id], room: roomname });
    socket.emit("chat start", { name: names[peer.id], room: roomname });
  }
}

io.on("connection", (socket) => {
  var address = socket.handshake.address;

  socket.on("login", function (data) {
    names[socket.id] = data.username;
    allUsers[socket.id] = socket;

    findpatner(socket);

    // names[socket.id] = data.username;
    // allUsers[socket.id] = socket;
    // now check if sb is in queue

    /////  findPeerForLoneSocket(socket);
  });

  socket.on("nowait", function (data) {
    const index = names.indexOf(socket.id);
    if (index > -1) {
      names.splice(index, 1);
    }

    const index1 = allUsers.indexOf(socket.id);
    if (index1 > -1) {
      allUsers.splice(index, 1);
    }
  });

  socket.on("img", function (data) {
    var room = roomsarray[socket.id];
    socket.broadcast.to(room).emit("img", data.text);
    /////   socket.emit.to(room).emit('message1');
    io.sockets.in(room).emit("message1");
  });

  socket.on("message", function (data) {
    var room = roomsarray[socket.id];
    socket.broadcast.to(room).emit("message", data.text);
    /////   socket.emit.to(room).emit('message1');
    io.sockets.in(room).emit("message1");
  });

  socket.on("typing", function (data) {
    var room = roomsarray[socket.id];
    socket.to(room).emit("typing", data.text);
  });

  socket.on("leave room", function () {
    try {
      var room = roomsarray[socket.id];
      socket.broadcast.to(room).emit("chat end");

      console.log("roomname name is " + room);

      var peerID = room.split("#");

      peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];

      console.log("functionl called");
      // // add both current and peer to the queue
      console.log("peerid name is " + allUsers[peerID]);
      findpatner(allUsers[peerID]);
      findpatner(socket);
    } catch {
      console.log("have some issue");
    }
  });

  socket.on("disconnect", function () {
    try {
      var room = roomsarray[socket.id];
      socket.broadcast.to(room).emit("chat end");
      var peerID = room.split("#");
      peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
      console.log("disconnect called"); // current socket left, add the other one to the queue
      findpatner(allUsers[peerID]);
    } catch {
      const index = queearray.indexOf(socket);
      console.log(index);
      if (index > -1) {
        queearray.splice(index, 1);

        console.log("the code ran perfectly");
      }

      console.log("some issue");
    }
  });
});

nextApp.prepare().then(() => {
  post(router);

  // app.get('/messages', (req, res) => {
  //   res.json(messages)
  // })

  // app.get('*', (req, res) => {
  //   return nextHandler(req, res)
  // })

  app.use(express.static(path.join(__dirname, "out")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/out/index.html"));
  });

  server.listen(5000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:5000");
  });
});
