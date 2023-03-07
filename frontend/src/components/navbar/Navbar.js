import { useEffect, useState } from "react";

const Navbar = ({ socket,setOpenChat }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getMessages", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type,message },i) => {
    let action;
    setOpenChat(true)
    // if (type === "marks") {
    //   action = "gave";
    //   return (
    //     <div key={i}>{`${senderName} ${action} you marks.`}</div>
    //   );
    // }
    if (type === "message") {
      action = "sent";
      return (
        <div key={i}>{`${senderName} ${action} a message - ${message}`}</div>
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
