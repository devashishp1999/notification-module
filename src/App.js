import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { data } from "./data";
import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

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
        <div>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
