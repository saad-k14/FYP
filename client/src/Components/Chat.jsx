import React from "react";
import { io } from "socket.io-client";
import Header from "./Common/Header";
import Newsletter from "./Common/Newsletter";
import Footer from "./Common/Footer";
import { getloggedinuser, getUser } from "../Services/usersService";
import { Link } from "react-router-dom";
import { getContacts, getMessages } from "../Services/chatsService";
import ScrollToBottom from "react-scroll-to-bottom";

let socket;
const END_POINT = "http://localhost:4000";

const Chat = (props) => {
  const [businessUserId, setBusinessUserId] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [loggedInUser, setLoggedInUser] = React.useState({});
  const [sender, setSender] = React.useState({});
  const [receiver, setReceiver] = React.useState({});
  const [room, setRoom] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const { businessUser } = props.location.state || "";

  const getAllContacts = async (userId) => {
    const { data } = await getContacts(userId);
    const contacts = [...data];
    setContacts(contacts);
  };

  const getSingleUser = async (userId) => {
    const { data } = await getUser(userId);
    setReceiver(data);
    var tempRoom;
    if (loggedInUser.role === "business") {
      tempRoom = data._id + "_" + loggedInUser._id;
      console.log(tempRoom);
      getPreviousChat(tempRoom);
    } else {
      tempRoom = loggedInUser._id + "_" + data._id;
      console.log(tempRoom);
      getPreviousChat(tempRoom);
    }

    if (!props.location.state) {
      socket.emit("join", { tempRoom });
    }
  };

  const getPreviousChat = async (room) => {
    const { data } = await getMessages(room);
    const messages = [...data];
    setMessages(messages);
    console.log(messages);
  };

  const onChangeReceiver = (id) => {
    getSingleUser(id);
  };

  React.useEffect(() => {
    socket = io.connect(END_POINT);

    if (props.location.state) {
      const businessUserId = businessUser._id || "";
      setBusinessUserId(businessUserId);
      const loggedInUser = getloggedinuser();
      getAllContacts(loggedInUser._id);
      if (loggedInUser) {
        setSender(loggedInUser);
        setLoggedInUser(loggedInUser);
      }

      setReceiver(businessUser);

      var tempRoom = loggedInUser._id + "_" + businessUser._id;
      setRoom(tempRoom);
      console.log(tempRoom);
      getPreviousChat(tempRoom);
      socket.emit("join", { tempRoom });
    } else {
      const loggedInUser = getloggedinuser();
      getAllContacts(loggedInUser._id);
      if (loggedInUser) {
        setSender(loggedInUser);
        setLoggedInUser(loggedInUser);
      }
    }
  }, [END_POINT, props.location.state]);

  React.useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      if (!room) {
        var room;
        console.log("Inside");
        if (loggedInUser.role === "business") {
          room = receiver._id + "_" + loggedInUser._id;
        } else {
          room = loggedInUser._id + "_" + receiver._id;
        }
        socket.emit("sendMessage", { sender, receiver, room, message }, () =>
          setMessage("")
        );
      } else {
        socket.emit("sendMessage", { sender, receiver, room, message }, () =>
          setMessage("")
        );
      }
    }
  };

  return (
    <>
      <Header />
      <div className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="dashboard-wrap">
                <div className="dashboard-thumb d-flex align-items-center py-3 mb-0">
                  <img
                    src="https://via.placeholder.com/90x90"
                    className="img-fluid mx-4 img-circle"
                    alt=""
                  />
                  <h4 className="mb-1">{loggedInUser.name}</h4>
                </div>
                <ul className="nav dashboard-verticle-nav">
                  {contacts.map((contact, i) => (
                    <li className="nav-item" key={i}>
                      <a
                        className="nav-link active"
                        onClick={() => onChangeReceiver(contact._id)}
                      >
                        <i className="ti-user"></i>
                        {contact.fullName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="candidate-list-layout py-1 mb-0">
                <div className="cll-wrap">
                  <div className="cll-thumb" style={{ height: "50px" }}>
                    <a href="resume-detail.html">
                      <img
                        src="https://via.placeholder.com/200x200"
                        className="img-responsive img-circle"
                        alt=""
                        style={{ maxWidth: "50px" }}
                      />
                    </a>
                  </div>
                  <div className="cll-caption mt-0">
                    <h5 className="mb-0">
                      <a href="resume-detail.html">{receiver.fullName}</a>
                    </h5>
                    <ul>
                      <li>
                        <i className="ti-time text-success"></i>Last Activity 04
                        min ago
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: "url('assets/images/chatWallpaper.png')",
                }}
              >
                <ScrollToBottom className="tr-single-body pb-1 scroll">
                  {messages.map((message, i) =>
                    message.sender === loggedInUser._id ? (
                      <div
                        className="qa-skill-box py-1 px-3 mb-3 bg-sender ml-5"
                        key={i}
                      >
                        <div className="qa-content mt-0">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="qa-skill-box py-1 px-3 mb-3 bg-receiver mr-5"
                        key={i}
                      >
                        <div className="qa-content mt-0">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    )
                  )}
                </ScrollToBottom>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border py-1"
                  placeholder="Enter Your Email"
                  style={{ height: "auto" }}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-black black"
                    style={{ height: "auto" }}
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
