import React, { useState } from "react";
import {data} from "../../data.js";

const Card = ({ socket, user, openChat }) => {
  const [message, setMessage] = useState("");

  const [chatMessage, setChatMessage] = useState("");

  let [sendTo, setSendTo] = useState([]);
  const handleClick = () => {};

  const handleNotification = (type, message) => {
    document
      .querySelectorAll(".checkbox")
      .forEach((checkbox) => (checkbox.checked = false));
    setSendTo([]);
    if (user.includes("student")) {
      if (type === "message" && message !== "") {
        return socket.emit("message", {
          senderName: user,
          receiverName: ["teacher"],
          type,
          message,
        });
      }
    }
    if (type === "message" && message !== "")
      socket.emit("message", {
        senderName: user,
        receiverName: sendTo,
        type,
        message,
      });
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setSendTo([...sendTo, e.target.value]);
    } else {
      sendTo = sendTo.splice(sendTo.indexOf(e.target.value), 1);
      setSendTo(sendTo);
    }
  };

  return (
    <div>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            {user === "teacher" && item.username.includes("student") ? (
              <div>
                {item.fullname}
                <span>
                  <input
                    className="checkbox"
                    value={item.username}
                    onChange={handleChange}
                    type={"checkbox"}
                  />
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type={"text"}
          placeholder="Type your message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            handleNotification("message", message);
            setMessage("");
          }}
        >
          Send Message
        </button>
      </div>
      {openChat ? (
        <div
          style={{
            border: "1px solid",
            height: "300px",
            width: "235px",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <div style={{ position: "absolute", bottom: 0 }}>
            <input
              type={"text"}
              placeholder="Enter message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <span>
              <button onClick={handleClick}>Send</button>
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
