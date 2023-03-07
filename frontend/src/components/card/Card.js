import React, { useState } from "react";

const Card = ({ item, socket, user }) => {
  const [message, setMessage] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleClick = () => {};

  const handleNotification = (type, message) => {
    setOpenChat(true)
    if (type === "response_to_teacher" && message !== "")
      socket.emit("sendNotification", {
        senderName: user,
        receiverName: item.username,
        type,
        message,
      });
    else {
      socket.emit("sendNotification", {
        senderName: user,
        receiverName: item.username,
        type,
        message,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{item.fullname}</p>
      <div>
        {user === "teacher" ? (
          <button onClick={() => handleNotification("marks", "")}>
            Send Marks
          </button>
        ) : (
          <>
            <input
              type={"text"}
              placeholder="Type your message.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => {
                handleNotification("response_to_teacher", message);
                setMessage("");
              }}
            >
              Send Response to teacher
            </button>
          </>
        )}
      </div>
      {
        openChat ? 
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
        </div> : ""
      }
    </div>
  );
};

export default Card;
