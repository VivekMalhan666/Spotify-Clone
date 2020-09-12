import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (token) {
      setToken(_token);
    }
  }, []);

  return (
    <div className="app">
      {token ? <h2>Authetication successful</h2> : <Login />}
      <Login />
    </div>
  );
}

export default App;
