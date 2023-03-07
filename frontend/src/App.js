import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { io } from "socket.io-client";
import SelectUser from "./components/SelectUser";

const App = () => {
  const socket = io("http://localhost:5000");

  const [user, setUser] = useState(null);
  const [openChat, setOpenChat] = useState(false);


  function setCurrentUser(username) {
    setUser(username);
  }

  useEffect(() => {
    if (user) socket?.emit("newUser", user);
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <div>
          <Navbar socket={socket} setOpenChat={setOpenChat} />
          <Card socket={socket} user={user} openChat={openChat} />
          <h3>User-{user}</h3>
        </div>
      ) : (
        <SelectUser setUser={setCurrentUser} />
      )}
    </div>
  );
};

export default App;
