import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import data from "./data";
import { io } from "socket.io-client";
import "./App.css";
import SelectUser from "./components/SelectUser";

const App = () => {
  const socket = io("http://localhost:5000");

  const [username, setUsername] = useState(null);

  const [user, setUser] = useState(null);

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
          <Navbar socket={socket} />
          {data.map((item) =>
            user === "teacher" && item.username.includes("student") ? (
              <Card key={item.id} item={item} socket={socket} user={user} />
            ) : user !== "teacher" && item.username.includes("teacher") ? (
              <Card key={item.id} item={item} socket={socket} user={user} />
            ) : (
              ""
            )
          )}
          <h3>User-{user}</h3>
        </div>
      ) : (
        <SelectUser setUser={setCurrentUser} />
      )}
    </div>
  );
};

export default App;
