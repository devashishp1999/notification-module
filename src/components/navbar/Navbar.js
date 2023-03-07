import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type,message },i) => {
    let action;
    if (type === "marks") {
      action = "gave";
      return (
        <div key={i}>{`${senderName} ${action} you marks.`}</div>
      );
    }
    else if(type==="response_to_teacher"){
      action="response"
      return (
        <div key={i}>{`${senderName} sent you a ${action} - ${message}`}</div>
      );
    }
  };

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <div>Notification - {notifications.length}</div>
      </div>
      {open && <div>{notifications.map((el,i) => displayNotification(el,i))}</div>}
    </div>
  );
};

export default Navbar;
